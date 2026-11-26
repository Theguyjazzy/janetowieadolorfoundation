import React, { FormEvent, useRef, useState } from 'react';
import { ArrowRight, Check, Share2 } from 'lucide-react';
import { submitPartner, submitVolunteer } from '../lib/convexClient';
import { useSubpageChoreography } from '../lib/motion';

interface GetInvolvedPageProps {
  onNavigate: (path: string, hash?: string) => void;
  showToast: (message: string, type?: 'success' | 'error') => void;
}

export const GetInvolvedPage: React.FC<GetInvolvedPageProps> = ({ onNavigate, showToast }) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  useSubpageChoreography(rootRef);

  // Volunteer form
  const [volName, setVolName] = useState('');
  const [volEmail, setVolEmail] = useState('');
  const [volSkill, setVolSkill] = useState('legal');
  const [volErr, setVolErr] = useState<{ name?: string; email?: string }>({});
  const [volSubmitting, setVolSubmitting] = useState(false);

  // Partner form
  const [partnerOrg, setPartnerOrg] = useState('');
  const [partnerEmail, setPartnerEmail] = useState('');
  const [partnerMsg, setPartnerMsg] = useState('');
  const [partnerErr, setPartnerErr] = useState<{ org?: string; email?: string }>({});
  const [partnerSubmitting, setPartnerSubmitting] = useState(false);

  const handleVolunteerSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const errs: { name?: string; email?: string } = {};
    if (volName.trim().length < 2) errs.name = 'Please enter your full name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(volEmail.trim())) {
      errs.email = 'Please enter a valid email address.';
    }
    setVolErr(errs);
    if (Object.keys(errs).length > 0) {
      showToast('Please fix the highlighted volunteer fields.', 'error');
      return;
    }

    setVolSubmitting(true);
    try {
      await submitVolunteer({
        name: volName.trim(),
        email: volEmail.trim(),
        areaOfInterest: volSkill,
      });
      setVolName('');
      setVolEmail('');
      setVolErr({});
      showToast("Thank you for applying! We'll be in touch about next outreach steps.", 'success');
    } catch {
      showToast('Could not submit volunteer application right now. Please try again.', 'error');
    } finally {
      setVolSubmitting(false);
    }
  };

  const handlePartnerSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const errs: { org?: string; email?: string } = {};
    if (partnerOrg.trim().length < 2) errs.org = 'Please enter your organization name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(partnerEmail.trim())) {
      errs.email = 'Please enter a valid work email.';
    }
    setPartnerErr(errs);
    if (Object.keys(errs).length > 0) {
      showToast('Please fix the highlighted partnership fields.', 'error');
      return;
    }

    setPartnerSubmitting(true);
    try {
      await submitPartner({
        organization: partnerOrg.trim(),
        email: partnerEmail.trim(),
        message: partnerMsg.trim(),
      });
      setPartnerOrg('');
      setPartnerEmail('');
      setPartnerMsg('');
      setPartnerErr({});
      showToast('Thank you! Our partnerships team will reach out shortly.', 'success');
    } catch {
      showToast('Could not send partnership inquiry right now. Please try again.', 'error');
    } finally {
      setPartnerSubmitting(false);
    }
  };

  return (
    <div ref={rootRef}>
      <section className="subpage-hero">
        <div className="frame">
          <div className="subpage-hero-grid">
            <h1 className="display-headline subpage-hero-title" data-subpage-hero>
              Ways you can stand with JOF.
            </h1>
            <p className="subpage-hero-desc" data-subpage-hero>
              Whether you bring legal counsel, medical expertise, corporate CSR funding, or community advocacy, your involvement creates generational stability.
            </p>
          </div>
        </div>
      </section>

      {/* Volunteer Section */}
      <section style={{ paddingBlock: 'var(--section-gap)' }}>
        <div className="frame">
          <div className="contact-grid">
            <div className="contact-info-col">
              <h2 className="section-headline">Become a Volunteer</h2>
              <p className="lead-copy">
                Donate your professional skills in pro-bono legal aid, medical care, business training, or event logistics to strengthen our field outreaches directly.
              </p>
              <ul className="deliverables-list">
                <li>
                  <Check size={16} color="var(--accent-coral)" aria-hidden="true" />
                  <span>Legal aid &amp; paralegal support for land rights cases</span>
                </li>
                <li>
                  <Check size={16} color="var(--accent-coral)" aria-hidden="true" />
                  <span>Medical volunteers for quarterly outreach clinics</span>
                </li>
                <li>
                  <Check size={16} color="var(--accent-coral)" aria-hidden="true" />
                  <span>Business &amp; vocational skills trainers</span>
                </li>
                <li>
                  <Check size={16} color="var(--accent-coral)" aria-hidden="true" />
                  <span>Community event &amp; food distribution logistics</span>
                </li>
              </ul>
            </div>

            <div className="contact-form-col" style={{ backgroundColor: 'var(--surface-sand)' }}>
              <h3>Volunteer Application</h3>
              <form className="field-grid" onSubmit={handleVolunteerSubmit} noValidate>
                <div className="field-group">
                  <label htmlFor="vol-name">Full Name *</label>
                  <input
                    id="vol-name"
                    type="text"
                    className={`field-control ${volErr.name ? 'is-invalid' : ''}`}
                    placeholder="e.g. Sarah Okafor"
                    value={volName}
                    onChange={(e) => {
                      setVolName(e.target.value);
                      if (volErr.name) setVolErr((p) => ({ ...p, name: undefined }));
                    }}
                  />
                  {volErr.name && <span className="field-error">{volErr.name}</span>}
                </div>

                <div className="field-group">
                  <label htmlFor="vol-email">Email Address *</label>
                  <input
                    id="vol-email"
                    type="email"
                    className={`field-control ${volErr.email ? 'is-invalid' : ''}`}
                    placeholder="you@example.com"
                    value={volEmail}
                    onChange={(e) => {
                      setVolEmail(e.target.value);
                      if (volErr.email) setVolErr((p) => ({ ...p, email: undefined }));
                    }}
                  />
                  {volErr.email && <span className="field-error">{volErr.email}</span>}
                </div>

                <div className="field-group">
                  <label htmlFor="vol-skill">Area of Interest</label>
                  <select
                    id="vol-skill"
                    className="field-control"
                    value={volSkill}
                    onChange={(e) => setVolSkill(e.target.value)}
                  >
                    <option value="legal">Legal Aid</option>
                    <option value="medical">Medical / Healthcare</option>
                    <option value="training">Business &amp; Vocational Training</option>
                    <option value="logistics">Events &amp; Logistics</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <button type="submit" className="btn-coral" disabled={volSubmitting}>
                  {volSubmitting ? 'Submitting…' : 'Submit Volunteer Application'}
                  <ArrowRight size={16} className="btn-arrow" aria-hidden="true" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Partnership */}
      <section style={{ backgroundColor: 'var(--surface-sand)', paddingBlock: 'var(--section-gap)' }}>
        <div className="frame">
          <div className="contact-grid">
            <div className="contact-form-col" style={{ gridColumn: '1 / 7' }}>
              <h3>Corporate Partnership Inquiry</h3>
              <form className="field-grid" onSubmit={handlePartnerSubmit} noValidate>
                <div className="field-group">
                  <label htmlFor="partner-org">Organization Name *</label>
                  <input
                    id="partner-org"
                    type="text"
                    className={`field-control ${partnerErr.org ? 'is-invalid' : ''}`}
                    placeholder="e.g. Benin Agribusiness Ltd."
                    value={partnerOrg}
                    onChange={(e) => {
                      setPartnerOrg(e.target.value);
                      if (partnerErr.org) setPartnerErr((p) => ({ ...p, org: undefined }));
                    }}
                  />
                  {partnerErr.org && <span className="field-error">{partnerErr.org}</span>}
                </div>

                <div className="field-group">
                  <label htmlFor="partner-email">Work Email *</label>
                  <input
                    id="partner-email"
                    type="email"
                    className={`field-control ${partnerErr.email ? 'is-invalid' : ''}`}
                    placeholder="csr@company.com"
                    value={partnerEmail}
                    onChange={(e) => {
                      setPartnerEmail(e.target.value);
                      if (partnerErr.email) setPartnerErr((p) => ({ ...p, email: undefined }));
                    }}
                  />
                  {partnerErr.email && <span className="field-error">{partnerErr.email}</span>}
                </div>

                <div className="field-group">
                  <label htmlFor="partner-message">Tell us about your CSR interest</label>
                  <textarea
                    id="partner-message"
                    rows={3}
                    className="field-control"
                    placeholder="Co-branded micro-grants, outreach sponsorship, or employee giving…"
                    value={partnerMsg}
                    onChange={(e) => setPartnerMsg(e.target.value)}
                  />
                </div>

                <button type="submit" className="btn-coral" disabled={partnerSubmitting}>
                  {partnerSubmitting ? 'Sending…' : 'Send Partnership Inquiry'}
                  <ArrowRight size={16} className="btn-arrow" aria-hidden="true" />
                </button>
              </form>
            </div>

            <div className="contact-info-col" style={{ gridColumn: '8 / 13' }}>
              <h2 className="section-headline">Corporate Partnership</h2>
              <p className="lead-copy">
                Align your organization’s CSR commitments with a verified widow empowerment programme backed by eight years of field accountability.
              </p>
              <ul className="deliverables-list">
                <li>
                  <Check size={16} color="var(--accent-coral)" aria-hidden="true" />
                  <span>Co-branded micro-grant sponsorship cohorts</span>
                </li>
                <li>
                  <Check size={16} color="var(--accent-coral)" aria-hidden="true" />
                  <span>Employee volunteering &amp; seasonal outreach drives</span>
                </li>
                <li>
                  <Check size={16} color="var(--accent-coral)" aria-hidden="true" />
                  <span>Stakeholder impact reporting &amp; audit documentation</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Advocate & Share */}
      <section style={{ paddingBlock: 'var(--section-gap)' }}>
        <div className="frame">
          <div className="mission-grid">
            <div className="mission-body-col" style={{ gridColumn: '1 / 7' }}>
              <h2 className="section-headline">Advocate &amp; share our mission.</h2>
              <p className="lead-copy">
                Sharing beneficiary dispatches within your network connects vulnerable widows to legal aid, medical clinics, and generous sponsors.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                <a
                  href="https://wa.me/?text=Support%20Janet%20Owieadolor%20Foundation%20empowering%20widows%20across%20Edo%20State%20and%20Nigeria%3A%20https%3A%2F%2Fjanetowieadolorfoundation.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-stone"
                >
                  <Share2 size={15} aria-hidden="true" /> Share on WhatsApp
                </a>
                <a
                  href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fjanetowieadolorfoundation.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-stone"
                >
                  <Share2 size={15} aria-hidden="true" /> Share on Facebook
                </a>
                <a
                  href="/donate"
                  className="btn-coral"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/donate');
                  }}
                >
                  Donate Directly <ArrowRight size={16} className="btn-arrow" aria-hidden="true" />
                </a>
              </div>
            </div>

            <figure className="mission-portrait-col" style={{ gridColumn: '8 / 13' }}>
              <div className="mission-portrait-frame">
                <img
                  src="/assets/gallery/community-children.jpg"
                  alt="Children supported by Janet Owieadolor Foundation communities"
                  loading="lazy"
                />
              </div>
            </figure>
          </div>
        </div>
      </section>
    </div>
  );
};
