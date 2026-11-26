import React, { useEffect, useRef, useState } from 'react';
import { CreditCard, MessageCircle, ShieldCheck } from 'lucide-react';
import {
  DONATE_TRANSPARENCY_STATS,
  DONATION_TIERS,
  JOF_CONTACT,
} from '../data/foundationData';
import { useSubpageChoreography } from '../lib/motion';

interface DonatePageProps {
  initialAmount?: number;
  showToast: (message: string, type?: 'success' | 'error') => void;
}

export const DonatePage: React.FC<DonatePageProps> = ({ initialAmount, showToast }) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  useSubpageChoreography(rootRef);

  const [frequency, setFrequency] = useState<'one-time' | 'monthly'>('one-time');
  const [amount, setAmount] = useState<number>(initialAmount && initialAmount > 0 ? initialAmount : 15000);
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [fieldErrors, setFieldErrors] = useState<{ name?: string; email?: string }>({});

  useEffect(() => {
    if (initialAmount && initialAmount > 0) {
      setAmount(initialAmount);
    }
  }, [initialAmount]);

  const matchedTier = DONATION_TIERS.find((t) => t.amount === amount);
  const impactNote = matchedTier
    ? matchedTier.description
    : `Your ${frequency === 'monthly' ? 'monthly' : 'one-time'} ₦${amount.toLocaleString()} contribution directly funds emergency food relief, medical screenings, and widow enterprise grants.`;

  const handleWhatsappDonate = () => {
    const errs: { name?: string; email?: string } = {};
    if (donorName.trim().length < 2) errs.name = 'Please enter your full name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(donorEmail.trim())) {
      errs.email = 'Please enter a valid email address.';
    }
    setFieldErrors(errs);

    if (amount <= 0 || Number.isNaN(amount)) {
      showToast('Please enter a valid Naira donation amount.', 'error');
      return;
    }
    if (Object.keys(errs).length > 0) {
      showToast('Please enter your name and valid email to continue.', 'error');
      return;
    }

    const freqLabel = frequency === 'monthly' ? 'Monthly' : 'One-Time';
    const text =
      `Hi JOF, I'd like to make a donation.\n\n` +
      `Name: ${donorName.trim()}\n` +
      `Email: ${donorEmail.trim()}\n` +
      `Amount: ₦${amount.toLocaleString()} (${freqLabel})\n\n` +
      `Please send me the account details to complete this donation.`;

    const waUrl = `https://wa.me/${JOF_CONTACT.whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
    showToast('Opening WhatsApp with your donation details…', 'success');
  };

  return (
    <div ref={rootRef}>
      <section className="subpage-hero">
        <div className="frame">
          <div className="subpage-hero-grid">
            <h1 className="display-headline subpage-hero-title" data-subpage-hero>
              Every naira reaches a widow directly.
            </h1>
            <p className="subpage-hero-desc" data-subpage-hero>
              100% of public donations fund micro-grants, seasonal food relief, legal advocacy, and medical clinics across Edo State and Nigeria.
            </p>
          </div>
        </div>
      </section>

      <section style={{ paddingBlock: 'var(--section-gap)' }}>
        <div className="frame">
          <div className="donate-ledger-grid">
            <div className="donate-proof-col">
              <h2 className="section-headline">Transparent stewardship.</h2>
              <p style={{ color: 'var(--ink-secondary)', lineHeight: 1.65 }}>
                We keep administrative overhead minimal so contributions translate straight into food parcels, school fees, optical care, and ₦50,000–₦75,000 seed enterprise grants.
              </p>

              <div className="contact-facts">
                <div className="contact-fact-row">
                  <strong>100% Audited Accountability</strong>
                  <p>Every naira is logged and reported to donors through quarterly outreach updates.</p>
                </div>
                <div className="contact-fact-row">
                  <strong>Registered Nigerian Non-Profit</strong>
                  <p>Headquartered at {JOF_CONTACT.address}.</p>
                </div>
                <div className="contact-fact-row">
                  <strong>Direct Field Delivery</strong>
                  <p>Delivered personally alongside Glorious Widows Fellowship and medical volunteers.</p>
                </div>
              </div>

              <div className="donate-stats-row">
                {DONATE_TRANSPARENCY_STATS.map((stat) => (
                  <div key={stat.label}>
                    <div className="donate-stat-num tabular-nums">{stat.value}</div>
                    <div className="donate-stat-label">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="donate-console-col">
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.25rem', fontWeight: 400, marginBottom: '0.35rem' }}>
                Select Contribution Amount
              </h2>
              <p style={{ color: 'var(--ink-secondary)', marginBottom: '1.5rem' }}>
                Sponsor a widow or keep a child in school today.
              </p>

              <div className="freq-switch" role="group" aria-label="Giving frequency">
                <button
                  type="button"
                  className={`freq-pill ${frequency === 'one-time' ? 'is-active' : ''}`}
                  onClick={() => setFrequency('one-time')}
                >
                  One-Time
                </button>
                <button
                  type="button"
                  className={`freq-pill ${frequency === 'monthly' ? 'is-active' : ''}`}
                  onClick={() => setFrequency('monthly')}
                >
                  Monthly Support
                </button>
              </div>

              <div className="amount-chips-row" role="group" aria-label="Preset Naira amounts">
                {DONATION_TIERS.map((tier) => (
                  <button
                    key={tier.amount}
                    type="button"
                    className={`amount-chip-btn tabular-nums ${amount === tier.amount ? 'is-active' : ''}`}
                    onClick={() => setAmount(tier.amount)}
                  >
                    {tier.formatted}
                  </button>
                ))}
              </div>

              <div className="field-grid">
                <div className="field-group">
                  <label htmlFor="custom-amount">Custom Amount (₦)</label>
                  <input
                    id="custom-amount"
                    type="number"
                    min={500}
                    step={500}
                    className="field-control tabular-nums"
                    value={amount || ''}
                    onChange={(e) => setAmount(parseInt(e.target.value, 10) || 0)}
                    placeholder="Enter custom amount in Naira"
                  />
                </div>

                <div className="donate-donor-row">
                  <div className="field-group">
                    <label htmlFor="donor-name">Full Name *</label>
                    <input
                      id="donor-name"
                      type="text"
                      className={`field-control ${fieldErrors.name ? 'is-invalid' : ''}`}
                      placeholder="Your full name"
                      value={donorName}
                      onChange={(e) => {
                        setDonorName(e.target.value);
                        if (fieldErrors.name) setFieldErrors((p) => ({ ...p, name: undefined }));
                      }}
                    />
                    {fieldErrors.name && <span className="field-error">{fieldErrors.name}</span>}
                  </div>

                  <div className="field-group">
                    <label htmlFor="donor-email">Email Address (for receipt) *</label>
                    <input
                      id="donor-email"
                      type="email"
                      className={`field-control ${fieldErrors.email ? 'is-invalid' : ''}`}
                      placeholder="you@example.com"
                      value={donorEmail}
                      onChange={(e) => {
                        setDonorEmail(e.target.value);
                        if (fieldErrors.email) setFieldErrors((p) => ({ ...p, email: undefined }));
                      }}
                    />
                    {fieldErrors.email && <span className="field-error">{fieldErrors.email}</span>}
                  </div>
                </div>

                <div
                  style={{
                    backgroundColor: 'var(--surface-sand)',
                    padding: '1.15rem 1.25rem',
                    borderRadius: '2px',
                    fontSize: 'var(--text-body)',
                  }}
                >
                  <strong style={{ display: 'block', marginBottom: '0.2rem' }}>
                    Direct Impact ({frequency === 'monthly' ? 'Monthly' : 'One-Time'}):
                  </strong>
                  <span>{impactNote}</span>
                </div>

                <button
                  type="button"
                  className="btn-coral"
                  style={{ width: '100%' }}
                  onClick={handleWhatsappDonate}
                >
                  <MessageCircle size={18} aria-hidden="true" />
                  Donate via WhatsApp
                </button>

                <button
                  type="button"
                  className="btn-disabled-card"
                  disabled
                  aria-disabled="true"
                >
                  <CreditCard size={17} aria-hidden="true" />
                  <span>Pay with Card (Coming Soon)</span>
                </button>

                <p style={{ fontSize: '0.875rem', color: 'var(--ink-secondary)', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <ShieldCheck size={16} aria-hidden="true" />
                  We reply immediately on WhatsApp with verified JOF bank account details.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
