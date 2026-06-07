// src/pages/Contact.tsx

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, MessageCircle, CheckCircle } from 'lucide-react';

const HERO_IMG = 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1800&q=85';

// ─── Shared design tokens (mirrors Home.tsx) ──────────────────────────────────
const C = {
  s0: 'rgba(4, 14, 35, 0.50)',
  s1: 'rgba(4, 14, 35, 0.68)',
  s4: 'rgba(4, 14, 35, 0.72)',

  gold:       '#C9A84C',
  goldLight:  '#E8C97A',
  goldDim:    'rgba(201,168,76,0.14)',
  goldBorder: 'rgba(201,168,76,0.18)',
  goldGlow:   'rgba(201,168,76,0.28)',

  textPrimary:   'rgba(255,255,255,0.94)',
  textSecondary: 'rgba(255,255,255,0.62)',
  textMuted:     'rgba(255,255,255,0.38)',
};

const GoldGradient = `linear-gradient(135deg, ${C.goldLight} 0%, ${C.gold} 50%, #9A7A2E 100%)`;
const GoldRule     = { background: `linear-gradient(90deg, transparent, ${C.gold}, transparent)`, height: '1px' };
const GlassCard: React.CSSProperties = {
  background:          'rgba(255,255,255,0.04)',
  backdropFilter:      'blur(14px)',
  WebkitBackdropFilter:'blur(14px)',
  border:              `1px solid ${C.goldBorder}`,
  borderRadius:        '1rem',
  boxShadow:           '0 8px 32px rgba(0,0,0,0.18)',
};

const contactInfo = [
  { Icon: Phone,  label: 'Phone',    value: '+91 7598514436',                    href: 'tel:+917598514436' },
  { Icon: Mail,   label: 'Email',    value: 'v.a.events99@gmail.com',                 href: 'mailto:v.a.events99@gmail.com' },
  { Icon: MapPin, label: 'Location', value: 'Sodanayagar Street, Bishop Rd, Puthur, Tennur, Tiruchirappalli, Tamil Nadu 620017', href: 'https://maps.app.goo.gl/VujA94QofnPaKXZ99' },
  { Icon: Clock,  label: 'Hours',    value: 'Mon – Sun: 9:00 AM – 9:00 PM',      href: null },
];

const Contact = () => {
  const [form, setForm] = useState({ name: '', phone: '', email: '', event: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Hi! I'd like to enquire about decorations.%0AName: ${encodeURIComponent(form.name)}%0APhone: ${encodeURIComponent(form.phone)}%0AEvent: ${encodeURIComponent(form.event)}%0AMessage: ${encodeURIComponent(form.message)}`;
    window.open(`https://wa.me/+917598514436?text=${msg}`, '_blank');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4500);
  };

  return (
    <div
      className="min-h-screen relative"
      style={{
        backgroundImage: `
          linear-gradient(to bottom,
            rgba(4, 14, 35, 0.78) 0%,
            rgba(6, 20, 50, 0.72) 45%,
            rgba(4, 14, 35, 0.82) 100%
          ),
          url('${HERO_IMG}')
        `,
        backgroundSize:       'cover',
        backgroundPosition:   'center',
        backgroundRepeat:     'no-repeat',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Scrollable content */}
      <div className="relative min-h-screen pt-24 pb-20" style={{ background: C.s1 }}>

        {/* ── Header ── */}
        <div className="relative py-16 px-4 text-center overflow-hidden">
          {/* Ambient gold glow */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
            style={{
              width: '600px', height: '600px', borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 68%)',
            }}
          />

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="relative">
            {/* Top gold rule */}
            <div className="w-16 mx-auto mb-5" style={GoldRule} />

            <p className="text-[10px] tracking-[0.28em] uppercase font-body mb-3" style={{ color: C.gold }}>
              Let's Talk
            </p>

            <h1 className="font-display text-5xl md:text-7xl font-bold mb-4 shimmer-gold">
              Contact Us
            </h1>

            <div className="w-16 mx-auto mb-5" style={GoldRule} />

            <p className="text-xl italic max-w-2xl mx-auto font-body" style={{ color: C.textSecondary }}>
              Have a celebration coming up? We'd love to make it extraordinary for you.
            </p>
          </motion.div>
        </div>

        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* ── Left panel ── */}
          <div className="lg:col-span-2 space-y-4">

            {/* WhatsApp CTA */}
            <motion.a
              initial={{ opacity: 0, x: -28 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.10 }}
              href="https://wa.me/+917598514436?text=Hi%20I%20want%20decoration"
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-4 transition-all duration-300 hover:scale-[1.02]"
              style={{
                ...GlassCard,
                padding: '1.5rem',
                border: '1px solid rgba(37,211,102,0.22)',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                textDecoration: 'none',
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.borderColor = 'rgba(37,211,102,0.48)')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.borderColor = 'rgba(37,211,102,0.22)')}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: 'rgba(37,211,102,0.12)', border: '1px solid rgba(37,211,102,0.28)' }}
              >
                <MessageCircle size={22} style={{ color: '#4ade80' }} strokeWidth={1.8} />
              </div>
              <div>
                <div className="font-display font-semibold text-lg" style={{ color: '#4ade80' }}>WhatsApp Us</div>
                <div className="text-sm font-body mt-0.5" style={{ color: C.textSecondary }}>Fastest response — click to chat</div>
              </div>
            </motion.a>

            {/* Contact detail rows */}
            {contactInfo.map(({ Icon, label, value, href }, i) => {
              const inner = (
                <div
                  className="flex items-center gap-4 transition-all duration-300 hover:scale-[1.02]"
                  style={{ ...GlassCard, padding: '1rem 1.25rem' }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: C.goldDim, border: `1px solid rgba(201,168,76,0.22)` }}
                  >
                    <Icon size={18} style={{ color: C.gold }} strokeWidth={1.8} />
                  </div>
                  <div>
                    <div
                      className="text-[10px] tracking-[0.22em] uppercase font-body font-medium mb-0.5"
                      style={{ color: C.gold }}
                    >
                      {label}
                    </div>
                    <div className="text-sm font-body" style={{ color: C.textPrimary }}>{value}</div>
                  </div>
                </div>
              );
              return (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: -28 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.08 }}
                >
                  {href ? <a href={href} style={{ textDecoration: 'none' }}>{inner}</a> : inner}
                </motion.div>
              );
            })}

            {/* Map */}
           <motion.div
  initial={{ opacity: 0, x: -28 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ delay: 0.52 }}
  style={{ ...GlassCard, overflow: 'hidden' }}
>
  <iframe
    title="VA Events Location"
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.347228391567!2d78.6760611!3d10.8156294!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baaf5e411cde8e1%3A0x8ed9dd50bcaaa07e!2sVA%20EVENTS!5e0!3m2!1sen!2sin!4v1770000000000"
    width="100%"
    height="200"
    loading="lazy"
    allowFullScreen
    referrerPolicy="no-referrer-when-downgrade"
    className="grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
    style={{
      border: 0,
      display: "block",
      borderRadius: "18px",
    }}
  />
</motion.div>
          </div>

          {/* ── Enquiry form ── */}
          <motion.div
            initial={{ opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.18, duration: 0.7 }}
            className="lg:col-span-3"
            style={{ ...GlassCard, padding: '2.5rem' }}
          >
            <h2 className="font-display text-3xl font-bold mb-1.5 shimmer-gold">Send an Enquiry</h2>
            <p className="text-sm font-body mb-8" style={{ color: C.textSecondary }}>
              Fill in the form — we'll reply on WhatsApp within a few hours.
            </p>

            {/* Success toast */}
            {submitted && (
              <motion.div
                initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 p-4 rounded-xl mb-6 text-sm font-body"
                style={{
                  background: 'rgba(37,211,102,0.10)',
                  border: '1px solid rgba(37,211,102,0.28)',
                  color: '#4ade80',
                }}
              >
                <CheckCircle size={18} strokeWidth={2} className="shrink-0" />
                Message sent! We'll reach you on WhatsApp shortly.
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="form-label" style={{ color: C.textPrimary }}>Your Name *</label>
                  <input name="name" type="text" required placeholder="Priya Lakshmi"
                    value={form.name} onChange={handleChange} className="form-input"
                    style={{ color: '#ffffff', caretColor: C.gold }} />
                </div>
                <div>
                  <label className="form-label" style={{ color: C.textPrimary }}>Phone Number *</label>
                  <input name="phone" type="tel" required placeholder="+91 98765 43210"
                    value={form.phone} onChange={handleChange} className="form-input"
                    style={{ color: '#ffffff', caretColor: C.gold }} />
                </div>
              </div>

              <div>
                <label className="form-label" style={{ color: C.textPrimary }}>Email Address</label>
                <input name="email" type="email" placeholder="you@example.com"
                  value={form.email} onChange={handleChange} className="form-input"
                  style={{ color: '#ffffff', caretColor: C.gold }} />
              </div>

              <div>
                <label className="form-label" style={{ color: C.textPrimary }}>Event Type *</label>
                <select name="event" required value={form.event} onChange={handleChange}
                  className="form-input cursor-pointer"
                  style={{
                    appearance: 'none',
                    color: form.event ? '#ffffff' : 'rgba(255,255,255,0.40)',
                  }}
                >
                  <option value=""            style={{ background: '#040E23' }}>Select event type…</option>
                  <option value="Birthday"    style={{ background: '#040E23', color: '#fff' }}>Birthday Celebration</option>
                  <option value="Wedding"     style={{ background: '#040E23', color: '#fff' }}>Wedding Ceremony</option>
                  <option value="Engagement"  style={{ background: '#040E23', color: '#fff' }}>Engagement Party</option>
                  <option value="Baby Shower" style={{ background: '#040E23', color: '#fff' }}>Baby Shower</option>
                  <option value="Corporate"   style={{ background: '#040E23', color: '#fff' }}>Corporate Event</option>
                  <option value="Other"       style={{ background: '#040E23', color: '#fff' }}>Other</option>
                </select>
              </div>

              <div>
                <label className="form-label" style={{ color: C.textPrimary }}>Your Message</label>
                <textarea name="message" rows={4}
                  placeholder="Tell us about your event — date, venue, theme, guest count…"
                  value={form.message} onChange={handleChange}
                  className="form-input resize-none"
                  style={{ color: '#ffffff', caretColor: C.gold }}
                />
              </div>

              {/* Submit button — matches Home gold-btn style inline */}
              <button
                type="submit"
                className="w-full py-4 text-base rounded-full font-body font-semibold tracking-wide flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] hover:brightness-110"
                style={{
                  background: GoldGradient,
                  color:      'rgba(4,14,35,0.96)',
                  boxShadow:  `0 4px 28px ${C.goldGlow}`,
                  border:     'none',
                  cursor:     'pointer',
                }}
              >
                <MessageCircle size={17} strokeWidth={2} /> Send via WhatsApp
              </button>

              <p className="text-xs text-center font-body" style={{ color: C.textMuted }}>
                This will open WhatsApp with your message pre-filled.
              </p>
            </form>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Contact;