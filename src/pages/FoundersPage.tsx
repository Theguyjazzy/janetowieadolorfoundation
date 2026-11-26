import React, { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import {
  BOARD_OF_TRUSTEES,
  COORDINATOR_MESSAGE,
  FOUNDATION_INITIATIVES,
  MISSION_DATA,
} from '../data/foundationData';
import { useSubpageChoreography } from '../lib/motion';

interface FoundersPageProps {
  onNavigate: (path: string, hash?: string) => void;
}

export const FoundersPage: React.FC<FoundersPageProps> = ({ onNavigate }) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  useSubpageChoreography(rootRef);

  return (
    <div ref={rootRef}>
      <section className="subpage-hero">
        <div className="frame">
          <div className="subpage-hero-grid">
            <h1 className="display-headline subpage-hero-title" data-subpage-hero>
              The stewards behind the foundation.
            </h1>
            <p className="subpage-hero-desc" data-subpage-hero>
              Meet Founder Mama Janet Owieadolor, the seven-member Board of Trustees, and the field coordinators guiding every outreach across Edo State and Nigeria.
            </p>
          </div>
        </div>
      </section>

      {/* Founder Spotlight */}
      <section style={{ paddingBlock: 'var(--section-gap)' }}>
        <div className="frame">
          <div className="mission-grid">
            <figure className="mission-portrait-col">
              <div className="mission-portrait-frame">
                <img
                  src="/assets/campaign/janet-portrait.jpg"
                  alt="Mama Janet Owieadolor, Founder of JOF"
                />
              </div>
            </figure>
            <div className="mission-body-col">
              <h2 className="section-headline">Mama Janet Owieadolor</h2>
              <p className="lead-copy">{MISSION_DATA.narrative}</p>
              <p style={{ color: 'var(--ink-secondary)', maxWidth: '58ch', lineHeight: 1.65 }}>
                Under her leadership, JOF has built enduring community bridges, mobilizing local medical volunteers, legal advocates, and partner networks to shield vulnerable households from poverty and disinheritance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Board of Trustees */}
      <section style={{ backgroundColor: 'var(--surface-sand)', paddingBlock: 'var(--section-gap)' }}>
        <div className="frame">
          <div style={{ marginBottom: 'clamp(2rem, 4vw, 3.5rem)' }}>
            <h2 className="section-headline">Board of Trustees</h2>
            <p className="lead-copy" style={{ marginTop: '0.75rem' }}>
              Governance accountability led by Chairman Dr. Francis Owieadolor and six trustees spanning medicine, engineering, law, and civic leadership.
            </p>
          </div>

          <div className="trustees-grid" data-reveal-group>
            {BOARD_OF_TRUSTEES.map((member) => (
              <article className="trustee-card" key={member.name} data-reveal-item>
                <div className="trustee-photo">
                  <img src={member.image} alt={member.name} loading="lazy" />
                </div>
                <h3 className="trustee-name">{member.name}</h3>
                <p className="trustee-role">{member.role}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Editor & Programme Coordinator Note */}
      <section style={{ paddingBlock: 'var(--section-gap)' }}>
        <div className="frame">
          <div className="mission-grid">
            <div className="mission-portrait-col">
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.1rem' }}>
                <img
                  src={COORDINATOR_MESSAGE.image}
                  alt={COORDINATOR_MESSAGE.name}
                  style={{
                    width: '76px',
                    height: '76px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    objectPosition: 'center 15%',
                  }}
                />
                <div>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 400 }}>
                    {COORDINATOR_MESSAGE.name}
                  </h2>
                  <p style={{ color: 'var(--accent-coral)', fontWeight: 600, fontSize: '0.9375rem' }}>
                    {COORDINATOR_MESSAGE.role}
                  </p>
                </div>
              </div>
            </div>

            <div className="mission-body-col" style={{ gap: '1.25rem' }}>
              {COORDINATOR_MESSAGE.paragraphs.map((para) => (
                <p key={para.slice(0, 24)} style={{ lineHeight: 1.7, color: 'var(--ink-primary)', maxWidth: '62ch' }}>
                  {para}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Six Initiatives */}
      <section style={{ backgroundColor: 'var(--surface-sand)', paddingBlock: 'var(--section-gap)' }}>
        <div className="frame">
          <h2 className="section-headline" style={{ marginBottom: '2rem' }}>
            Six pillars of field activity.
          </h2>
          <div className="initiatives-grid" data-reveal-group>
            {FOUNDATION_INITIATIVES.map((item) => (
              <div className="initiative-item" key={item.title} data-reveal-item>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '3rem' }}>
            <a
              href="/get-involved"
              className="btn-coral"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/get-involved');
              }}
            >
              Partner or Volunteer With Us <ArrowRight size={16} className="btn-arrow" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
