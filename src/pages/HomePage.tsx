import React, { useEffect, useRef, useState, FormEvent } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';
import { gsap } from 'gsap';
import {
  BASELINE_STORIES,
  CHRONICLE_FRAMES,
  CORE_PROGRAMS,
  DIGNITY_VOICES,
  DONATION_TIERS,
  IMPACT_METRICS,
  JOF_CONTACT,
  MISSION_DATA,
  StoryItem,
} from '../data/foundationData';
import { fetchPublishedPosts, mergeStoriesWithBaseline, submitContact } from '../lib/convexClient';
import { prefersReducedMotion, useHomeChoreography } from '../lib/motion';

interface HomePageProps {
  onNavigate: (path: string, hash?: string) => void;
  showToast: (message: string, type?: 'success' | 'error') => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, showToast }) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const plateImgRef = useRef<HTMLImageElement | null>(null);
  const plateWrapRef = useRef<HTMLDivElement | null>(null);
  const voiceStageRef = useRef<HTMLDivElement | null>(null);
  const tierPanelRef = useRef<HTMLDivElement | null>(null);

  const [selectedTierIdx, setSelectedTierIdx] = useState(1);
  const [activeProgramIdx, setActiveProgramIdx] = useState(0);
  const [activeVoiceIdx, setActiveVoiceIdx] = useState(0);
  const [voicePaused, setVoicePaused] = useState(false);
  const [stories, setStories] = useState<StoryItem[]>(BASELINE_STORIES);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [inquiryType, setInquiryType] = useState('donation');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [submitting, setSubmitting] = useState(false);

  useHomeChoreography(rootRef);

  useEffect(() => {
    let active = true;
    fetchPublishedPosts().then((posts) => {
      if (!active || !posts.length) return;
      setStories(mergeStoriesWithBaseline(posts, BASELINE_STORIES));
    });
    return () => {
      active = false;
    };
  }, []);

  const handleSelectVoice = (idx: number) => {
    const normalized = (idx + DIGNITY_VOICES.length) % DIGNITY_VOICES.length;
    setActiveVoiceIdx(normalized);
    if (!prefersReducedMotion() && voiceStageRef.current) {
      gsap.fromTo(
        voiceStageRef.current,
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.42, ease: 'power3.out' },
      );
    }
  };

  useEffect(() => {
    if (voicePaused) return;
    const timer = window.setInterval(() => {
      setActiveVoiceIdx((prev) => {
        const next = (prev + 1) % DIGNITY_VOICES.length;
        if (!prefersReducedMotion() && voiceStageRef.current) {
          gsap.fromTo(
            voiceStageRef.current,
            { y: 14, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.42, ease: 'power3.out' },
          );
        }
        return next;
      });
    }, 7500);
    return () => window.clearInterval(timer);
  }, [voicePaused]);

  const handleSelectTier = (idx: number) => {
    setSelectedTierIdx(idx);
    if (!prefersReducedMotion() && tierPanelRef.current) {
      gsap.fromTo(
        tierPanelRef.current,
        { y: 10, opacity: 0.35 },
        { y: 0, opacity: 1, duration: 0.28, ease: 'power3.out' },
      );
    }
  };

  const handleSelectProgram = (idx: number) => {
    if (idx === activeProgramIdx) return;
    setActiveProgramIdx(idx);
    if (!prefersReducedMotion() && plateWrapRef.current && plateImgRef.current) {
      gsap.fromTo(
        plateWrapRef.current,
        { clipPath: 'inset(0% 0% 100% 0%)' },
        { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.55, ease: 'power4.out' },
      );
      gsap.fromTo(
        plateImgRef.current,
        { scale: 1.07 },
        { scale: 1.0, duration: 0.65, ease: 'power3.out' },
      );
    }
  };

  const handleContactSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const nextErrors: { name?: string; email?: string; message?: string } = {};
    if (fullName.trim().length < 2) nextErrors.name = 'Please enter your full name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    if (message.trim().length < 10) {
      nextErrors.message = 'Please enter a message of at least 10 characters.';
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      showToast('Please fix the highlighted fields before sending.', 'error');
      return;
    }

    setSubmitting(true);
    try {
      await submitContact({
        name: fullName.trim(),
        email: email.trim(),
        inquiryType,
        message: message.trim(),
      });
      const sender = fullName.trim();
      setFullName('');
      setEmail('');
      setInquiryType('donation');
      setMessage('');
      setErrors({});
      showToast(`Thank you, ${sender}. Your message has been sent to JOF.`, 'success');
    } catch {
      showToast('Could not send your message right now. Please try WhatsApp or phone.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const activeTier = DONATION_TIERS[selectedTierIdx];
  const activeProgram = CORE_PROGRAMS[activeProgramIdx];
  const activeVoice = DIGNITY_VOICES[activeVoiceIdx];
  const leadStory = stories[0] || BASELINE_STORIES[0];
  const companionStories = stories.slice(1, 4);

  return (
    <div ref={rootRef}>
      {/* SECTION 1: HERO */}
      <section className="hero-band" id="hero">
        <div className="frame">
          <div className="hero-headline-grid">
            <div className="hero-title-col">
              <h1 className="display-headline">
                <span className="line-mask">
                  <span className="hero-line-inner line-inner">
                    Restoring dignity to widows
                  </span>
                </span>
                <span className="line-mask">
                  <span className="hero-line-inner line-inner">
                    across Edo State.
                  </span>
                </span>
              </h1>
            </div>

            <div className="hero-meta-col">
              <p className="hero-sub">
                Founded by Mama Janet Owieadolor in Benin City, JOF delivers food relief, free medical clinics, micro-grants, and legal rights advocacy directly to vulnerable families.
              </p>
              <div className="hero-actions">
                <a
                  href="/donate"
                  className="btn-coral"
                  data-magnetic
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/donate');
                  }}
                >
                  Donate to an Outreach <ArrowRight size={16} className="btn-arrow" aria-hidden="true" />
                </a>
                <a
                  href="#programs"
                  className="hero-link-quiet"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/', '#programs');
                  }}
                >
                  Explore Programmes <ArrowRight size={15} aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>

          <div className="hero-prints-stage">
            <figure className="hero-print-left" data-parallax-print="-16">
              <div className="print-frame">
                <img
                  src="/assets/campaign/handing-fabric-1.jpg"
                  alt="JOF coordinator presenting welfare materials to an Edo State widow"
                />
              </div>
              <figcaption className="print-caption">
                Direct community welfare handoff in Edo State
              </figcaption>
            </figure>

            <figure className="hero-print-main">
              <div className="print-frame">
                <img
                  src="/assets/campaign/hero-janet-widows.jpg"
                  alt="Mama Janet Owieadolor standing alongside widows during The Triumph of Widowhood outreach"
                />
              </div>
              <figcaption className="print-caption">
                Mama Janet Owieadolor with outreach beneficiaries · Benin City
              </figcaption>
            </figure>

            <figure className="hero-print-right" data-parallax-print="18">
              <div className="print-frame">
                <img
                  src="/assets/hero/hero-2.jpg"
                  alt="Two women smiling during a JOF field outreach gathering"
                />
              </div>
              <figcaption className="print-caption">
                Community fellowship &amp; peer mentorship
              </figcaption>
            </figure>
          </div>

          <div className="hero-location-note">
            <span>22 Eromosele Street, Ekewan Road, Benin City, Edo State</span>
            <span>8+ Years Continuous Field Service · Registered Nigerian Non-Profit</span>
          </div>
        </div>
      </section>

      {/* SECTION 2: MISSION & LINEAGE DIPTYCH (De-boxed) */}
      <section className="mission-band" id="about">
        <div className="frame">
          <div className="mission-grid">
            <figure className="mission-portrait-col">
              <div className="mission-portrait-frame">
                <img
                  src="/assets/campaign/janet-portrait.jpg"
                  alt="Mama Janet Owieadolor, Founder of the Janet Owieadolor Foundation"
                  data-parallax-print="-14"
                  loading="lazy"
                />
              </div>
              <figcaption className="print-caption">
                Mama Janet Owieadolor · Founder, Benin City
              </figcaption>
            </figure>

            <div className="mission-body-col">
              <h2 className="section-headline" data-reveal-heading>
                Creating a world where no widow stands alone.
              </h2>

              <p className="lead-copy">{MISSION_DATA.narrative}</p>

              <div className="vm-duet" data-reveal-group>
                <div className="vm-block" data-reveal-item>
                  <h3>Our Vision</h3>
                  <p>{MISSION_DATA.vision}</p>
                </div>
                <div className="vm-block" data-reveal-item>
                  <h3>Our Mission</h3>
                  <p>{MISSION_DATA.mission}</p>
                </div>
              </div>

              <div>
                <a
                  href="/founders"
                  className="btn-stone"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/founders');
                  }}
                >
                  Meet Mama Janet &amp; Board of Trustees <ArrowRight size={16} aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>

          <div className="pillars-ledger" data-reveal-group>
            {MISSION_DATA.pillars.map((pillar) => (
              <div className="pillar-ledger-row" key={pillar.title} data-reveal-item>
                <h3>{pillar.title}</h3>
                <p>{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: VERIFIED IMPACT & ARCHITECTURAL NAIRA LEDGER */}
      <section className="chronicle-band" id="impact">
        <div className="frame">
          <h2 className="section-headline chronicle-intro" style={{ color: 'var(--ink-on-dark)' }} data-reveal-heading>
            Verified field impact across Edo communities.
          </h2>
          <p className="chronicle-subnote">
            Every outreach pairs immediate household food and medical care with micro-grants and legal protection that keep mothers independent for years.
          </p>

          <div className="metrics-strip" data-reveal-group>
            {IMPACT_METRICS.map((item) => (
              <div className="metric-cell" key={item.label} data-reveal-item>
                <div
                  className="metric-value tabular-nums"
                  data-counter-target={item.target}
                  data-counter-suffix={item.suffix}
                  data-counter-decimals={item.decimals ?? 0}
                >
                  {item.target}{item.suffix}
                </div>
                <div className="metric-label">{item.label}</div>
                <p className="metric-detail">{item.detail}</p>
              </div>
            ))}
          </div>

          <div className="ledger-stage">
            <div className="ledger-controls-col">
              <h3>See what your gift builds on the ground</h3>
              <p style={{ color: 'var(--ink-muted-dark)' }}>
                Select a contribution tier to inspect its direct household outcome.
              </p>

              <div className="ledger-tier-tabs" role="group" aria-label="Donation impact tiers">
                {DONATION_TIERS.map((tier, idx) => (
                  <button
                    key={tier.amount}
                    type="button"
                    className={`naira-tier-btn tabular-nums ${selectedTierIdx === idx ? 'is-active' : ''}`}
                    onClick={() => handleSelectTier(idx)}
                  >
                    {tier.formatted}
                  </button>
                ))}
              </div>

              <div className="naira-impact-panel" ref={tierPanelRef}>
                <div className="naira-impact-amount tabular-nums">{activeTier.formatted}</div>
                <p className="naira-impact-desc">{activeTier.description}</p>
                <span className="naira-impact-track">Track: {activeTier.programmeLink}</span>
              </div>

              <div>
                <a
                  href={`/donate?amount=${activeTier.amount}`}
                  className="btn-coral"
                  data-magnetic
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(`/donate?amount=${activeTier.amount}`);
                  }}
                >
                  Give {activeTier.formatted} via WhatsApp <ArrowRight size={16} className="btn-arrow" aria-hidden="true" />
                </a>
              </div>
            </div>

            <div className="chronicle-reel-col">
              <div className="chronicle-strip">
                {CHRONICLE_FRAMES.map((frame) => (
                  <figure className="chronicle-card" key={frame.src}>
                    <div className="chronicle-card-img">
                      <img src={frame.src} alt={frame.caption} loading="lazy" />
                    </div>
                    <figcaption>{frame.caption}</figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: CORE PROGRAMMES — Living Monograph Plate Index */}
      <section className="programmes-band" id="programs">
        <div className="frame">
          <div className="programmes-header">
            <h2 className="section-headline" data-reveal-heading>
              Core relief and empowerment programmes.
            </h2>
            <p>
              Four coordinated tracks designed to move widows and single mothers from immediate emergency relief to long-term financial sovereignty.
            </p>
          </div>

          <div className="monograph-grid">
            <div className="monograph-index" role="tablist" aria-label="Core Foundation Programmes">
              {CORE_PROGRAMS.map((prog, idx) => {
                const isSelected = activeProgramIdx === idx;
                return (
                  <button
                    key={prog.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    className={`programme-row ${isSelected ? 'is-active' : ''}`}
                    onClick={() => handleSelectProgram(idx)}
                  >
                    <span className="programme-row-title">{prog.title}</span>
                    <span className="programme-row-focus">{prog.impactFocus}</span>
                  </button>
                );
              })}
            </div>

            <div className="monograph-plate-col" role="tabpanel">
              <div className="programme-plate-frame" ref={plateWrapRef}>
                <img
                  ref={plateImgRef}
                  src={activeProgram.image}
                  alt={activeProgram.imageAlt}
                  className="programme-plate-img"
                />
              </div>

              <div className="programme-plate-details">
                <div>
                  <p>{activeProgram.summary}</p>
                  <div style={{ marginTop: '1.25rem' }}>
                    <a
                      href="/donate"
                      className="btn-coral"
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigate('/donate');
                      }}
                    >
                      {activeProgram.ctaLabel} <ArrowRight size={16} className="btn-arrow" aria-hidden="true" />
                    </a>
                  </div>
                </div>

                <ul className="deliverables-list">
                  {activeProgram.deliverables.map((item) => (
                    <li key={item}>
                      <span className="deliverable-dash" aria-hidden="true">—</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: STORIES FROM THE FIELD — Asymmetric 1+3 Broadsheet Dossier */}
      <section className="stories-band" id="stories">
        <div className="frame">
          <div className="stories-broadsheet-head">
            <h2 className="section-headline" data-reveal-heading>
              Stories from the field.
            </h2>
            <a
              href="/stories"
              className="btn-stone"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/stories');
              }}
            >
              Read All Stories <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>

          <div className="broadsheet-dossier" data-reveal-group>
            <article className="lead-story-col lead-story-card" data-reveal-item>
              <a
                href={`/stories/${encodeURIComponent(leadStory.slug)}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(`/stories/${encodeURIComponent(leadStory.slug)}`);
                }}
              >
                <div className="lead-story-media">
                  <img src={leadStory.imageUrl} alt={leadStory.title} loading="lazy" />
                </div>
                <h3 className="story-ledger-title" style={{ fontSize: 'var(--text-section)' }}>
                  {leadStory.title}
                </h3>
                <p className="story-ledger-excerpt">{leadStory.excerpt}</p>
                <span className="story-meta-action">
                  {leadStory.category} · Read Full Story <ArrowRight size={15} aria-hidden="true" />
                </span>
              </a>
            </article>

            <div className="story-ledger-col">
              {companionStories.map((story) => (
                <article key={story.slug} className="story-ledger-row" data-reveal-item>
                  <a
                    href={`/stories/${encodeURIComponent(story.slug)}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(`/stories/${encodeURIComponent(story.slug)}`);
                    }}
                  >
                    <div className="story-ledger-copy">
                      <h3 className="story-ledger-title">{story.title}</h3>
                      <p className="story-ledger-excerpt">{story.excerpt}</p>
                      <span className="story-meta-action">
                        {story.category} · Read Full Story
                      </span>
                    </div>
                    <div className="story-ledger-thumb">
                      <img src={story.imageUrl} alt={story.title} loading="lazy" />
                    </div>
                  </a>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: VOICES OF DIGNITY — Single Focal Quote Stage */}
      <section className="voices-band" id="testimonials">
        <div className="frame">
          <div className="voices-grid">
            <div
              className="voices-stage-col"
              onMouseEnter={() => setVoicePaused(true)}
              onMouseLeave={() => setVoicePaused(false)}
              onFocus={() => setVoicePaused(true)}
              onBlur={() => setVoicePaused(false)}
            >
              <h2 className="section-headline" data-reveal-heading>
                Voices of dignity.
              </h2>

              <div className="voices-avatar-bar" role="tablist" aria-label="Select foundation voice">
                {DIGNITY_VOICES.map((person, idx) => (
                  <button
                    key={person.id}
                    type="button"
                    role="tab"
                    aria-selected={activeVoiceIdx === idx}
                    className={`voice-avatar-btn ${activeVoiceIdx === idx ? 'is-active' : ''}`}
                    onClick={() => handleSelectVoice(idx)}
                  >
                    <img src={person.imageUrl} alt={person.name} />
                    <span>{person.name}</span>
                  </button>
                ))}
              </div>

              <div className="voice-quote-stage" ref={voiceStageRef}>
                <blockquote className="voice-quote-text">“{activeVoice.quote}”</blockquote>
                <div className="voice-attribution">
                  <div>
                    <div className="voice-person-name">{activeVoice.name}</div>
                    <div className="voice-person-meta">{activeVoice.meta}</div>
                  </div>

                  <div className="voice-controls">
                    <button
                      type="button"
                      className="icon-circle-btn"
                      aria-label="Previous beneficiary quote"
                      onClick={() => handleSelectVoice(activeVoiceIdx - 1)}
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      type="button"
                      className="icon-circle-btn"
                      aria-label="Next beneficiary quote"
                      onClick={() => handleSelectVoice(activeVoiceIdx + 1)}
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <figure className="voices-community-col">
              <div className="community-frame">
                <img
                  src="/assets/gallery/community-children.jpg"
                  alt="Children from communities supported by the Janet Owieadolor Foundation"
                  data-parallax-print="-12"
                  loading="lazy"
                />
              </div>
              <figcaption className="community-proof-caption">
                <span className="community-proof-num tabular-nums">98.4%</span>
                <span className="community-proof-text">
                  Long-term economic independence rate among micro-grant recipients.
                </span>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* SECTION 7: REACH OUT & DIRECT LINE (De-boxed directly on Weathered Sand) */}
      <section className="contact-band" id="contact">
        <div className="frame">
          <div className="contact-grid">
            <div className="contact-info-col">
              <h2 className="section-headline" data-reveal-heading>
                Reach our Benin City office directly.
              </h2>
              <p className="lead-copy">
                Whether you are coordinating a corporate partnership, referring a widow for assistance, or confirming a donation transfer, our team responds directly.
              </p>

              <div className="contact-facts">
                <div className="contact-fact-row">
                  <strong>Headquarters Address</strong>
                  <p>{JOF_CONTACT.address}</p>
                </div>

                <div className="contact-fact-row">
                  <strong>Direct Support Line</strong>
                  <a href={JOF_CONTACT.phoneHref}>{JOF_CONTACT.phoneDisplay}</a>
                </div>

                <div className="contact-fact-row">
                  <strong>Official Email</strong>
                  <a href={`mailto:${JOF_CONTACT.email}`}>{JOF_CONTACT.email}</a>
                </div>
              </div>

              <div style={{ marginTop: '0.5rem' }}>
                <a
                  href={JOF_CONTACT.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-coral"
                  data-magnetic
                >
                  <MessageCircle size={17} aria-hidden="true" />
                  Chat on WhatsApp (+234 703 324 4322)
                </a>
              </div>
            </div>

            <div className="contact-form-col">
              <h3>Send us a message</h3>
              <form className="field-grid" onSubmit={handleContactSubmit} noValidate>
                <div className="field-group">
                  <label htmlFor="contact-full-name">Full Name *</label>
                  <input
                    id="contact-full-name"
                    type="text"
                    className={`field-control ${errors.name ? 'is-invalid' : ''}`}
                    placeholder="e.g. Sarah Okafor"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                    }}
                    required
                  />
                  {errors.name && <span className="field-error">{errors.name}</span>}
                </div>

                <div className="field-group">
                  <label htmlFor="contact-email">Email Address *</label>
                  <input
                    id="contact-email"
                    type="email"
                    className={`field-control ${errors.email ? 'is-invalid' : ''}`}
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                    }}
                    required
                  />
                  {errors.email && <span className="field-error">{errors.email}</span>}
                </div>

                <div className="field-group">
                  <label htmlFor="contact-inquiry-type">Inquiry Category</label>
                  <select
                    id="contact-inquiry-type"
                    className="field-control"
                    value={inquiryType}
                    onChange={(e) => setInquiryType(e.target.value)}
                  >
                    <option value="donation">Donation &amp; Sponsorship</option>
                    <option value="partnership">Corporate Partnership</option>
                    <option value="volunteer">Volunteering</option>
                    <option value="beneficiary">Beneficiary Assistance Request</option>
                    <option value="general">General Information</option>
                  </select>
                </div>

                <div className="field-group">
                  <label htmlFor="contact-message">Your Message *</label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    className={`field-control ${errors.message ? 'is-invalid' : ''}`}
                    placeholder="How can we assist you or collaborate?"
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      if (errors.message) setErrors((prev) => ({ ...prev, message: undefined }));
                    }}
                    required
                  />
                  {errors.message && <span className="field-error">{errors.message}</span>}
                </div>

                <button type="submit" className="btn-coral" disabled={submitting}>
                  {submitting ? 'Sending Message…' : 'Send Message'}
                  <ArrowRight size={16} className="btn-arrow" aria-hidden="true" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
