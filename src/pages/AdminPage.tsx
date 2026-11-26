import React, { FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import { ArrowRight, ExternalLink, Lock, LogOut, Trash2, UploadCloud } from 'lucide-react';
import {
  CmsPost,
  createCmsPost,
  fetchPublishedPosts,
  generateUploadUrl,
  removeCmsPost,
  verifyAdminPassword,
} from '../lib/convexClient';
import { BASELINE_STORIES } from '../data/foundationData';
import { useSubpageChoreography } from '../lib/motion';

interface AdminPageProps {
  onNavigate: (path: string, hash?: string) => void;
  showToast: (message: string, type?: 'success' | 'error') => void;
}

/**
 * Resize and compress large phone photos in the browser before uploading to Convex.
 */
async function compressImage(
  file: File,
  maxDimension = 1600,
  quality = 0.82,
): Promise<Blob> {
  if (file.size < 300 * 1024) return file;

  const objectUrl = URL.createObjectURL(file);
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = reject;
      image.src = objectUrl;
    });

    let { width, height } = img;
    if (width > maxDimension || height > maxDimension) {
      const scale = maxDimension / Math.max(width, height);
      width = Math.round(width * scale);
      height = Math.round(height * scale);
    }

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return file;
    ctx.drawImage(img, 0, 0, width, height);

    const blob = await new Promise<Blob | null>((resolve) => {
      canvas.toBlob(resolve, 'image/jpeg', quality);
    });

    return blob && blob.size < file.size ? blob : file;
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

async function uploadWithRetry(
  fileBlob: Blob,
  password: string,
  attempts = 3,
): Promise<string> {
  let lastError: unknown;
  for (let i = 0; i < attempts; i++) {
    try {
      const uploadUrl = await generateUploadUrl(password);
      const uploadResult = await fetch(uploadUrl, {
        method: 'POST',
        headers: { 'Content-Type': fileBlob.type || 'image/jpeg' },
        body: fileBlob,
      });
      if (!uploadResult.ok) {
        throw new Error(`Upload failed with status ${uploadResult.status}`);
      }
      const uploadJson = (await uploadResult.json()) as { storageId: string };
      return uploadJson.storageId;
    } catch (err) {
      lastError = err;
      if (i < attempts - 1) {
        await new Promise((r) => window.setTimeout(r, 1000));
      }
    }
  }
  throw lastError;
}

export const AdminPage: React.FC<AdminPageProps> = ({ onNavigate, showToast }) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  useSubpageChoreography(rootRef);

  const coverInputRef = useRef<HTMLInputElement | null>(null);
  const galleryInputRef = useRef<HTMLInputElement | null>(null);

  // Kept only in memory for the current tab session (mirrors original admin.html)
  const [adminPassword, setAdminPassword] = useState<string | null>(null);
  const [passwordInput, setPasswordInput] = useState('');
  const [loginBusy, setLoginBusy] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [publishing, setPublishing] = useState(false);
  const [publishError, setPublishError] = useState<string | null>(null);
  const [publishSuccess, setPublishSuccess] = useState(false);

  const [posts, setPosts] = useState<CmsPost[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const loadPosts = useCallback(async () => {
    setLoadingPosts(true);
    try {
      const list = await fetchPublishedPosts();
      setPosts(list);
    } finally {
      setLoadingPosts(false);
    }
  }, []);

  useEffect(() => {
    if (adminPassword !== null) {
      loadPosts();
    }
  }, [adminPassword, loadPosts]);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setLoginBusy(true);
    try {
      await verifyAdminPassword(passwordInput);
      setAdminPassword(passwordInput);
      setPasswordInput('');
      showToast('Admin session unlocked.', 'success');
    } catch {
      setLoginError('Incorrect password. Please try again.');
      showToast('Incorrect admin password.', 'error');
    } finally {
      setLoginBusy(false);
    }
  };

  const handleLogout = () => {
    setAdminPassword(null);
    setPasswordInput('');
    setPosts([]);
    showToast('Signed out of Admin.', 'success');
  };

  const handlePublish = async (e: FormEvent) => {
    e.preventDefault();
    if (!adminPassword) return;

    const cleanTitle = title.trim();
    const cleanCategory = category.trim();
    const cleanExcerpt = excerpt.trim();
    const cleanContent = content.trim();

    if (!cleanTitle || !cleanExcerpt || !cleanContent) {
      const msg = 'Please fill in the Title, Short Excerpt, and Full Story fields.';
      setPublishError(msg);
      showToast(msg, 'error');
      return;
    }

    setPublishError(null);
    setPublishSuccess(false);
    setPublishing(true);

    try {
      let imageId: string | undefined;
      if (coverFile) {
        const compressed = await compressImage(coverFile);
        imageId = await uploadWithRetry(compressed, adminPassword);
      }

      // Upload gallery photos sequentially so slower mobile connections retry cleanly
      const galleryImageIds: string[] = [];
      for (const file of galleryFiles) {
        const compressed = await compressImage(file);
        galleryImageIds.push(await uploadWithRetry(compressed, adminPassword));
      }

      await createCmsPost({
        password: adminPassword,
        title: cleanTitle,
        excerpt: cleanExcerpt,
        content: cleanContent,
        imageId,
        category: cleanCategory || undefined,
        galleryImageIds: galleryImageIds.length ? galleryImageIds : undefined,
      });

      setTitle('');
      setCategory('');
      setExcerpt('');
      setContent('');
      setCoverFile(null);
      setGalleryFiles([]);
      if (coverInputRef.current) coverInputRef.current.value = '';
      if (galleryInputRef.current) galleryInputRef.current.value = '';
      setPublishSuccess(true);
      showToast('Post published to News & Stories.', 'success');
      await loadPosts();
    } catch (err) {
      const message = err instanceof Error ? err.message : '';
      const isNetwork = message.toLowerCase().includes('fetch');
      const friendly = isNetwork
        ? "Connection hiccup. Your text wasn't lost — please tap Publish Post again."
        : message || 'Something went wrong. Please try again.';
      setPublishError(friendly);
      showToast(friendly, 'error');
    } finally {
      setPublishing(false);
    }
  };

  const handleDelete = async (postId?: string) => {
    if (!adminPassword || !postId) return;
    if (!window.confirm('Delete this post? This cannot be undone.')) return;

    setDeletingId(postId);
    try {
      await removeCmsPost(adminPassword, postId);
      showToast('Post deleted.', 'success');
      await loadPosts();
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to delete post.';
      showToast(msg, 'error');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div ref={rootRef}>
      <section className="subpage-hero">
        <div className="frame">
          <div className="subpage-hero-grid">
            <h1 className="display-headline subpage-hero-title" data-subpage-hero>
              News &amp; Updates Admin.
            </h1>
            <div className="subpage-hero-desc" data-subpage-hero>
              <p>
                Publish field dispatches, outreach reports, and photo galleries directly to the JOF Stories archive.
              </p>
              {adminPassword !== null && (
                <button
                  type="button"
                  className="btn-stone"
                  style={{ marginTop: '1rem' }}
                  onClick={handleLogout}
                >
                  <LogOut size={15} aria-hidden="true" /> Log Out
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      <section style={{ paddingBlock: 'var(--section-gap)' }}>
        <div className="frame">
          {adminPassword === null ? (
            <div
              style={{
                maxWidth: '460px',
                marginInline: 'auto',
                backgroundColor: 'var(--surface-sand)',
                padding: 'clamp(1.75rem, 4vw, 2.75rem)',
                borderRadius: '2px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.75rem' }}>
                <Lock size={18} color="var(--accent-coral)" aria-hidden="true" />
                <h2 className="section-headline" style={{ fontSize: 'var(--text-lead)' }}>
                  Admin Sign In
                </h2>
              </div>
              <p style={{ color: 'var(--ink-secondary)', marginBottom: '1.5rem', fontSize: 'var(--text-meta)' }}>
                Enter the admin password to publish or manage Convex CMS posts.
              </p>

              <form id="admin-login-form" className="field-grid" onSubmit={handleLogin} noValidate>
                <div className="field-group">
                  <label htmlFor="admin-password">Password</label>
                  <input
                    id="admin-password"
                    type="password"
                    className={`field-control ${loginError ? 'is-invalid' : ''}`}
                    placeholder="Admin password"
                    value={passwordInput}
                    onChange={(e) => {
                      setPasswordInput(e.target.value);
                      if (loginError) setLoginError(null);
                    }}
                    required
                  />
                  {loginError && <span className="field-error">{loginError}</span>}
                </div>

                <button
                  type="submit"
                  id="admin-login-btn"
                  className="btn-coral"
                  disabled={loginBusy}
                >
                  {loginBusy ? 'Checking…' : 'Log In'}
                  <ArrowRight size={16} className="btn-arrow" aria-hidden="true" />
                </button>
              </form>
            </div>
          ) : (
            <div className="contact-grid">
              <div
                className="contact-info-col"
                style={{
                  backgroundColor: 'var(--surface-sand)',
                  padding: 'clamp(1.75rem, 3.5vw, 2.5rem)',
                  borderRadius: '2px',
                }}
              >
                <h2 className="section-headline" style={{ fontSize: 'var(--text-section)' }}>
                  Write a New Post
                </h2>
                <p style={{ color: 'var(--ink-secondary)', marginBottom: '1.5rem', fontSize: 'var(--text-meta)' }}>
                  Images over 300 KB are automatically resized in your browser before upload.
                </p>

                <form id="post-form" className="field-grid" onSubmit={handlePublish} noValidate>
                  <div className="field-group">
                    <label htmlFor="post-title">Title *</label>
                    <input
                      id="post-title"
                      type="text"
                      className="field-control"
                      placeholder="e.g. JOF Opens New Vocational Training Center"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </div>

                  <div className="field-group">
                    <label htmlFor="post-category">Category (optional)</label>
                    <input
                      id="post-category"
                      type="text"
                      className="field-control"
                      placeholder="e.g. Micro-Grants, Medical Care, Field Dispatch, Food Relief"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    />
                  </div>

                  <div className="field-group">
                    <label htmlFor="post-excerpt">Short Excerpt *</label>
                    <textarea
                      id="post-excerpt"
                      rows={2}
                      className="field-control"
                      placeholder="A one or two sentence summary shown on the Stories page"
                      value={excerpt}
                      onChange={(e) => setExcerpt(e.target.value)}
                      required
                    />
                  </div>

                  <div className="field-group">
                    <label htmlFor="post-content">Full Story *</label>
                    <textarea
                      id="post-content"
                      rows={8}
                      className="field-control"
                      placeholder="Write the full post here. Leave a blank line between paragraphs."
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      required
                    />
                  </div>

                  <div className="field-group">
                    <label htmlFor="post-image">Cover Image (optional)</label>
                    <input
                      ref={coverInputRef}
                      id="post-image"
                      type="file"
                      accept="image/*"
                      className="field-control"
                      onChange={(e) => setCoverFile(e.target.files?.[0] ?? null)}
                    />
                  </div>

                  <div className="field-group">
                    <label htmlFor="post-gallery">Photo Gallery (optional, pick multiple)</label>
                    <input
                      ref={galleryInputRef}
                      id="post-gallery"
                      type="file"
                      accept="image/*"
                      multiple
                      className="field-control"
                      onChange={(e) => setGalleryFiles(Array.from(e.target.files ?? []))}
                    />
                    {galleryFiles.length > 0 && (
                      <span style={{ fontSize: '0.85rem', color: 'var(--ink-secondary)' }}>
                        {galleryFiles.length} gallery image(s) selected
                      </span>
                    )}
                  </div>

                  {publishError && <span className="field-error">{publishError}</span>}
                  {publishSuccess && (
                    <span style={{ color: '#2E7D32', fontSize: '0.9rem', fontWeight: 600 }}>
                      Post published successfully.
                    </span>
                  )}

                  <button
                    type="submit"
                    id="post-submit-btn"
                    className="btn-coral"
                    disabled={publishing}
                  >
                    <UploadCloud size={17} aria-hidden="true" />
                    {publishing ? 'Publishing…' : 'Publish Post'}
                  </button>
                </form>
              </div>

              <div className="contact-form-col">
                <h2 className="section-headline" style={{ fontSize: 'var(--text-section)', marginBottom: '0.5rem' }}>
                  Published CMS Posts
                </h2>
                <p style={{ color: 'var(--ink-secondary)', marginBottom: '1.5rem', fontSize: 'var(--text-meta)' }}>
                  Live posts stored in Convex ({posts.length}) · Plus {BASELINE_STORIES.length} archival dispatches bundled in the site.
                </p>

                <div id="admin-posts-list" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {loadingPosts ? (
                    <p style={{ color: 'var(--ink-secondary)' }}>Loading…</p>
                  ) : !posts.length ? (
                    <div
                      style={{
                        padding: '1.5rem',
                        border: '1px solid var(--border-stone)',
                        borderRadius: '2px',
                        color: 'var(--ink-secondary)',
                      }}
                    >
                      No live CMS posts published yet. Use the form on the left to publish one, or browse the {BASELINE_STORIES.length} archival stories on{' '}
                      <a
                        href="/stories"
                        style={{ color: 'var(--accent-coral)', textDecoration: 'underline' }}
                        onClick={(e) => {
                          e.preventDefault();
                          onNavigate('/stories');
                        }}
                      >
                        /stories
                      </a>
                      .
                    </div>
                  ) : (
                    posts.map((post) => (
                      <article
                        key={post._id || post.slug}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '1rem',
                          padding: '1rem',
                          border: '1px solid var(--border-stone)',
                          borderRadius: '2px',
                          backgroundColor: 'var(--ground-limestone)',
                        }}
                      >
                        <img
                          src={post.imageUrl || '/assets/logo/jof-icon-512.png'}
                          alt={post.title}
                          style={{
                            width: '56px',
                            height: '56px',
                            objectFit: 'cover',
                            borderRadius: '2px',
                            flexShrink: 0,
                          }}
                        />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontWeight: 600, color: 'var(--ink-primary)' }}>{post.title}</div>
                          <div style={{ fontSize: '0.82rem', color: 'var(--ink-secondary)', marginTop: '0.2rem' }}>
                            {post.category ? `${post.category} · ` : ''}/stories/{post.slug}
                          </div>
                        </div>
                        <a
                          href={`/stories/${encodeURIComponent(post.slug)}`}
                          className="hero-link-quiet"
                          style={{ fontSize: '0.85rem' }}
                          onClick={(e) => {
                            e.preventDefault();
                            onNavigate(`/stories/${encodeURIComponent(post.slug)}`);
                          }}
                        >
                          View <ExternalLink size={14} aria-hidden="true" />
                        </a>
                        <button
                          type="button"
                          className="btn-stone"
                          style={{
                            padding: '0.45rem 0.75rem',
                            color: '#B23B3B',
                            borderColor: 'rgba(178, 59, 59, 0.35)',
                          }}
                          disabled={deletingId === post._id}
                          onClick={() => handleDelete(post._id)}
                        >
                          <Trash2 size={14} aria-hidden="true" />
                          {deletingId === post._id ? 'Deleting…' : 'Delete'}
                        </button>
                      </article>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
