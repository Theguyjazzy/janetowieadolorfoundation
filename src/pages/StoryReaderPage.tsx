import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { BASELINE_STORIES, StoryItem } from '../data/foundationData';
import {
  fetchPostBySlug,
  fetchPublishedPosts,
  mapConvexPostToStory,
  mergeStoriesWithBaseline,
} from '../lib/convexClient';
import { useSubpageChoreography } from '../lib/motion';

interface StoryReaderPageProps {
  slug: string;
  onNavigate: (path: string, hash?: string) => void;
}

function matchBaseline(slug: string): StoryItem | undefined {
  const clean = decodeURIComponent(slug).toLowerCase();
  return BASELINE_STORIES.find(
    (s) =>
      s.slug === clean ||
      (clean.includes('adaeze') && s.slug.includes('adaeze')) ||
      (clean.includes('ngozi') && s.slug.includes('ngozi')) ||
      (clean.includes('chiamaka') && s.slug.includes('chiamaka')) ||
      (clean.includes('blessing') && s.slug.includes('blessing')),
  );
}

export const StoryReaderPage: React.FC<StoryReaderPageProps> = ({ slug, onNavigate }) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  useSubpageChoreography(rootRef);

  const [story, setStory] = useState<StoryItem | null>(() => matchBaseline(slug) ?? null);
  const [loadingRemote, setLoadingRemote] = useState<boolean>(() => !matchBaseline(slug));
  const [allStories, setAllStories] = useState<StoryItem[]>(BASELINE_STORIES);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  useEffect(() => {
    const local = matchBaseline(slug);
    setStory(local ?? null);
    setLoadingRemote(!local);

    let active = true;
    fetchPostBySlug(slug)
      .then((remote) => {
        if (!active) return;
        if (remote) {
          const mapped = mapConvexPostToStory(
            remote,
            local?.imageUrl || '/assets/logo/jof-icon-512.png',
          );
          setStory({
            ...mapped,
            beneficiaryName: remote.authorName || local?.beneficiaryName || 'Janet Owieadolor Foundation',
            beneficiaryMeta: remote.authorMeta || local?.beneficiaryMeta || 'JOF Field Dispatch',
            pullquote: local?.pullquote || remote.excerpt,
            paragraphs: remote.body
              ? remote.body.split(/\n\n+/).filter(Boolean)
              : local?.paragraphs || [remote.excerpt],
            stats: local?.stats || [],
            tags: local?.tags || [],
            gallery: remote.galleryUrls?.length ? remote.galleryUrls : local?.gallery,
          });
        }
      })
      .finally(() => {
        if (active) setLoadingRemote(false);
      });

    fetchPublishedPosts().then((posts) => {
      if (!active || !posts.length) return;
      setAllStories(mergeStoriesWithBaseline(posts, BASELINE_STORIES));
    });

    return () => {
      active = false;
    };
  }, [slug]);

  if (!story) {
    return (
      <div ref={rootRef}>
        <section className="subpage-hero">
          <div className="frame">
            <div className="subpage-hero-grid">
              <h1 className="display-headline subpage-hero-title" data-subpage-hero>
                {loadingRemote ? 'Loading dispatch…' : 'Story not found.'}
              </h1>
              <div className="subpage-hero-desc" data-subpage-hero>
                <p>
                  {loadingRemote
                    ? 'Fetching the full field report from our archive.'
                    : 'This post may have been removed or moved.'}
                </p>
                <a
                  href="/stories"
                  className="hero-link-quiet"
                  style={{ marginTop: '1rem' }}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/stories');
                  }}
                >
                  <ArrowLeft size={15} aria-hidden="true" /> Back to All Stories
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  const related = allStories.filter((s) => s.slug !== story.slug).slice(0, 3);

  return (
    <div ref={rootRef}>
      <section className="subpage-hero">
        <div className="frame">
          <div className="subpage-hero-grid">
            <h1 className="display-headline subpage-hero-title" data-subpage-hero>
              {story.title}
            </h1>
            <div className="subpage-hero-desc" data-subpage-hero>
              <strong style={{ display: 'block', color: 'var(--accent-coral)', marginBottom: '0.35rem' }}>
                {story.category}
              </strong>
              <p style={{ fontWeight: 600, color: 'var(--ink-primary)' }}>{story.beneficiaryName}</p>
              <p style={{ marginBottom: '1.1rem' }}>{story.beneficiaryMeta}</p>
              <a
                href="/stories"
                className="hero-link-quiet"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/stories');
                }}
              >
                <ArrowLeft size={15} aria-hidden="true" /> Back to All Stories
              </a>
            </div>
          </div>
        </div>
      </section>

      <article className="frame">
        <div className="story-article-wrap" data-reveal-group>
          <div className="story-hero-portrait" data-reveal-item>
            <img src={story.imageUrl} alt={story.beneficiaryName} />
          </div>

          <div className="story-prose">
            {story.paragraphs.map((p) => (
              <p key={p.slice(0, 28)} data-reveal-item>{p}</p>
            ))}

            {story.pullquote && (
              <blockquote className="story-pullquote" data-reveal-item>“{story.pullquote}”</blockquote>
            )}
          </div>

          {story.stats.length > 0 && (
            <div className="donate-stats-row" style={{ marginTop: '2.5rem' }} data-reveal-item>
              {story.stats.map((st) => (
                <div key={st.label}>
                  <div className="donate-stat-num tabular-nums">{st.value}</div>
                  <div className="donate-stat-label">{st.label}</div>
                </div>
              ))}
            </div>
          )}

          {story.gallery && story.gallery.length > 0 && (
            <div style={{ marginTop: '3rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem' }}>
              {story.gallery.map((src) => (
                <button
                  key={src}
                  type="button"
                  style={{ border: 0, padding: 0, cursor: 'zoom-in', aspectRatio: '4/3', overflow: 'hidden', borderRadius: '2px' }}
                  onClick={() => setLightboxSrc(src)}
                >
                  <img src={src} alt="Field gallery moment" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </button>
              ))}
            </div>
          )}

          <div
            style={{
              marginTop: '3.5rem',
              backgroundColor: 'var(--surface-sand)',
              padding: '2rem',
              borderRadius: '2px',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '1.25rem',
            }}
          >
            <div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 400 }}>
                Help write the next story.
              </h2>
              <p style={{ color: 'var(--ink-secondary)' }}>
                Grants start at ₦50,000 and tuition stipends start at ₦15,000.
              </p>
            </div>
            <a
              href="/donate"
              className="btn-coral"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/donate');
              }}
            >
              Donate Now <ArrowRight size={16} className="btn-arrow" aria-hidden="true" />
            </a>
          </div>
        </div>
      </article>

      <section style={{ backgroundColor: 'var(--surface-sand)', paddingBlock: 'var(--section-gap)' }}>
        <div className="frame">
          <div className="stories-broadsheet-head">
            <h2 className="section-headline">More stories from the field.</h2>
            <a
              href="/stories"
              className="hero-link-quiet"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/stories');
              }}
            >
              View All Dispatches <ArrowRight size={15} aria-hidden="true" />
            </a>
          </div>

          <div className="broadsheet-dossier related-dossier" data-reveal-group>
            {related[0] && (
              <article className="lead-story-col lead-story-card related-lead-col" data-reveal-item>
                <a
                  href={`/stories/${encodeURIComponent(related[0].slug)}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(`/stories/${encodeURIComponent(related[0].slug)}`);
                  }}
                >
                  <div className="lead-story-media related-lead-media">
                    <img src={related[0].imageUrl} alt={related[0].title} loading="lazy" />
                  </div>
                  <h3 className="story-ledger-title" style={{ fontSize: 'var(--text-lead)' }}>
                    {related[0].title}
                  </h3>
                  <p className="story-ledger-excerpt">{related[0].excerpt}</p>
                  <span className="story-meta-action">
                    {related[0].category} · Read Full Story <ArrowRight size={15} aria-hidden="true" />
                  </span>
                </a>
              </article>
            )}

            <div className="story-ledger-col">
              {related.slice(1).map((item) => (
                <article key={item.slug} className="story-ledger-row" data-reveal-item>
                  <a
                    href={`/stories/${encodeURIComponent(item.slug)}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(`/stories/${encodeURIComponent(item.slug)}`);
                    }}
                  >
                    <div className="story-ledger-copy">
                      <h3 className="story-ledger-title">{item.title}</h3>
                      <p className="story-ledger-excerpt">{item.excerpt}</p>
                      <span className="story-meta-action">
                        {item.category} · Read Full Story
                      </span>
                    </div>
                    <div className="story-ledger-thumb">
                      <img src={item.imageUrl} alt={item.title} loading="lazy" />
                    </div>
                  </a>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {lightboxSrc && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setLightboxSrc(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 130,
            backgroundColor: 'rgba(20, 18, 16, 0.92)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            cursor: 'zoom-out',
          }}
        >
          <img
            src={lightboxSrc}
            alt="Enlarged gallery frame"
            style={{ maxWidth: '92vw', maxHeight: '88vh', objectFit: 'contain' }}
          />
        </div>
      )}
    </div>
  );
};
