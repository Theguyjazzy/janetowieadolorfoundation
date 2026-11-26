import React, { useState, FormEvent } from 'react';
import { ArrowRight, CheckCircle2, AlertTriangle, Menu, X, Send } from 'lucide-react';
import { JOF_CONTACT } from '../data/foundationData';
import { submitNewsletter } from '../lib/convexClient';

export type AppRoute =
  | '/'
  | '/stories'
  | '/founders'
  | '/get-involved'
  | '/donate'
  | '/admin'
  | `/stories/${string}`;

interface LayoutProps {
  currentPath: string;
  onNavigate: (path: string, hash?: string) => void;
  toast: { message: string; type: 'success' | 'error' } | null;
  showToast: (message: string, type?: 'success' | 'error') => void;
  veilRef: React.RefObject<HTMLDivElement | null>;
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({
  currentPath,
  onNavigate,
  toast,
  showToast,
  veilRef,
  children,
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribing, setSubscribing] = useState(false);

  const navLinks = [
    { label: 'Mission', path: '/', hash: '#about' },
    { label: 'Programmes', path: '/', hash: '#programs' },
    { label: 'Stories', path: '/stories' },
    { label: 'Founders', path: '/founders' },
    { label: 'Get Involved', path: '/get-involved' },
  ];

  const handleLinkClick = (e: React.MouseEvent, path: string, hash?: string) => {
    e.preventDefault();
    setDrawerOpen(false);
    onNavigate(path, hash);
  };

  const handleNewsletterSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const trimmed = newsletterEmail.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }

    setSubscribing(true);
    try {
      await submitNewsletter(trimmed);
      setNewsletterEmail('');
      showToast('Subscribed! Thank you for staying connected with JOF.', 'success');
    } catch {
      showToast('Could not complete subscription right now. Please try again.', 'error');
    } finally {
      setSubscribing(false);
    }
  };

  return (
    <div className="site-shell">
      {/* MOT-02: Woven Veil Route Transition Overlay */}
      <div className="route-veil" ref={veilRef} aria-hidden="true">
        <span className="route-veil-mark">Janet Owieadolor Foundation</span>
      </div>

      {/* Architectural Header */}
      <header className="site-header">
        <div className="frame header-inner">
          <a
            href="/"
            className="brand-anchor"
            onClick={(e) => handleLinkClick(e, '/')}
          >
            <img
              src="/assets/logo/jof-logo.png"
              alt="Janet Owieadolor Foundation crest"
              className="brand-crest"
            />
            <span className="brand-title-group">
              <span className="brand-acronym">JOF</span>
              <span className="brand-full">Janet Owieadolor Foundation</span>
            </span>
          </a>

          <nav className="primary-nav" aria-label="Primary Navigation">
            {navLinks.map((item) => {
              const isCurrent =
                item.path !== '/'
                  ? currentPath.startsWith(item.path)
                  : currentPath === '/' && !item.hash;
              return (
                <a
                  key={item.label}
                  href={item.hash ? `${item.path}${item.hash}` : item.path}
                  className={`nav-item ${isCurrent ? 'is-active' : ''}`}
                  onClick={(e) => handleLinkClick(e, item.path, item.hash)}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          <div className="header-actions">
            <a
              href="/donate"
              className="btn-coral header-donate-desktop"
              data-magnetic
              onClick={(e) => handleLinkClick(e, '/donate')}
            >
              Donate Now <ArrowRight size={16} className="btn-arrow" aria-hidden="true" />
            </a>
            <button
              type="button"
              className="mobile-menu-toggle"
              aria-label={drawerOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={drawerOpen}
              onClick={() => setDrawerOpen((prev) => !prev)}
            >
              {drawerOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Full-Height Drawer */}
      <div
        className={`mobile-drawer ${drawerOpen ? 'is-open' : ''}`}
        aria-hidden={!drawerOpen}
      >
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem' }}>JOF</span>
            <button
              type="button"
              className="icon-circle-btn"
              style={{ borderColor: 'rgba(244,242,236,0.28)', color: 'var(--ink-on-dark)' }}
              aria-label="Close navigation menu"
              onClick={() => setDrawerOpen(false)}
            >
              <X size={20} />
            </button>
          </div>
          <nav className="mobile-drawer-links" aria-label="Mobile Navigation">
            <a href="/" className="mobile-drawer-link" onClick={(e) => handleLinkClick(e, '/')}>
              Home
            </a>
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.hash ? `${item.path}${item.hash}` : item.path}
                className="mobile-drawer-link"
                onClick={(e) => handleLinkClick(e, item.path, item.hash)}
              >
                {item.label}
              </a>
            ))}
            <a
              href="/donate"
              className="mobile-drawer-link"
              style={{ color: 'var(--accent-brass)' }}
              onClick={(e) => handleLinkClick(e, '/donate')}
            >
              Donate Now
            </a>
          </nav>
        </div>

        <div style={{ paddingTop: '1.5rem', fontSize: '0.9375rem', color: 'var(--ink-muted-dark)' }}>
          <p>{JOF_CONTACT.address}</p>
          <p style={{ marginTop: '0.4rem' }}>{JOF_CONTACT.phoneDisplay}</p>
        </div>
      </div>

      <main>{children}</main>

      {/* Monumental Architectural Footer */}
      <footer className="site-footer">
        <div className="frame">
          <div className="footer-columns">
            <div>
              <div className="footer-brand-lockup">
                <img
                  src="/assets/logo/jof-logo-white.png"
                  alt="JOF White Crest"
                />
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.45rem' }}>
                    {JOF_CONTACT.shortName}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--ink-muted-dark)' }}>
                    {JOF_CONTACT.tagline}
                  </div>
                </div>
              </div>
              <p className="footer-desc">
                Dedicated to uplifting indigent women and widows across Edo State and Nigeria through direct food relief, medical equity, micro-grants, and legal rights advocacy.
              </p>
            </div>

            <div className="footer-col">
              <h4>Explore</h4>
              <ul className="footer-nav-list">
                <li>
                  <a href="/" onClick={(e) => handleLinkClick(e, '/')}>
                    Home
                  </a>
                </li>
                <li>
                  <a href="/#about" onClick={(e) => handleLinkClick(e, '/', '#about')}>
                    About Our Vision
                  </a>
                </li>
                <li>
                  <a href="/#impact" onClick={(e) => handleLinkClick(e, '/', '#impact')}>
                    Impact Chronicle
                  </a>
                </li>
                <li>
                  <a href="/stories" onClick={(e) => handleLinkClick(e, '/stories')}>
                    Beneficiary Stories
                  </a>
                </li>
                <li>
                  <a href="/founders" onClick={(e) => handleLinkClick(e, '/founders')}>
                    Founders & Trustees
                  </a>
                </li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Action & Programmes</h4>
              <ul className="footer-nav-list">
                <li>
                  <a href="/#programs" onClick={(e) => handleLinkClick(e, '/', '#programs')}>
                    Super Woman Relief
                  </a>
                </li>
                <li>
                  <a href="/#programs" onClick={(e) => handleLinkClick(e, '/', '#programs')}>
                    Medical & Optical Care
                  </a>
                </li>
                <li>
                  <a href="/#programs" onClick={(e) => handleLinkClick(e, '/', '#programs')}>
                    Livelihood Micro-Grants
                  </a>
                </li>
                <li>
                  <a href="/get-involved" onClick={(e) => handleLinkClick(e, '/get-involved')}>
                    Volunteer & Partner
                  </a>
                </li>
                <li>
                  <a href="/donate" onClick={(e) => handleLinkClick(e, '/donate')}>
                    Donate Now
                  </a>
                </li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Field Updates</h4>
              <p style={{ fontSize: '0.9375rem', color: 'var(--ink-muted-dark)', lineHeight: 1.55 }}>
                Receive quarterly outreach dispatches and beneficiary impact reports.
              </p>
              <form className="newsletter-inline" onSubmit={handleNewsletterSubmit} noValidate>
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Email address"
                  aria-label="Email address for quarterly impact updates"
                  required
                />
                <button
                  type="submit"
                  className="btn-coral"
                  style={{ padding: '0.7rem 1rem' }}
                  aria-label="Subscribe to newsletter"
                  disabled={subscribing}
                >
                  <Send size={16} aria-hidden="true" />
                </button>
              </form>
              <p style={{ marginTop: '0.85rem', fontSize: '0.875rem', color: 'var(--ink-muted-dark)' }}>
                {JOF_CONTACT.phoneDisplay} ·{' '}
                <a
                  href={JOF_CONTACT.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'underline' }}
                >
                  WhatsApp Support
                </a>
              </p>
            </div>
          </div>

          <div className="footer-wordmark-row">
            <div className="footer-monument-title">Janet Owieadolor Foundation</div>
            <div className="footer-legal-bar">
              <span>
                © 2026 Janet Owieadolor Foundation (JOF). Benin City, Edo State, Nigeria.{' '}
                <a
                  href="/admin"
                  aria-label="Admin Portal"
                  style={{ opacity: 0.35, textDecoration: 'none', paddingInline: '0.25rem' }}
                  onClick={(e) => handleLinkClick(e, '/admin')}
                >
                  ·
                </a>
              </span>
              <span>
                <a
                  href={JOF_CONTACT.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ marginRight: '1.25rem' }}
                >
                  Facebook
                </a>
                <a href={`mailto:${JOF_CONTACT.email}`}>{JOF_CONTACT.email}</a>
              </span>
            </div>
          </div>
        </div>
      </footer>

      {/* Live Toast Feedback */}
      <div
        className={`toast-banner ${toast ? 'is-visible' : ''}`}
        role="status"
        aria-live="polite"
      >
        {toast?.type === 'error' ? (
          <AlertTriangle size={18} color="#f59e0b" aria-hidden="true" />
        ) : (
          <CheckCircle2 size={18} color="#b5942e" aria-hidden="true" />
        )}
        <span>{toast?.message}</span>
      </div>
    </div>
  );
};
