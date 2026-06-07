import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';
import logo from "../assets/logo.jpg";

const C = {
  gold:       '#C9A84C',
  goldLight:  '#E8C97A',
  goldDim:    'rgba(201,168,76,0.14)',
  goldBorder: 'rgba(201,168,76,0.18)',
  goldGlow:   'rgba(201,168,76,0.28)',
  textPrimary:   'rgba(255,255,255,0.94)',
  textSecondary: 'rgba(255,255,255,0.54)',
  textMuted:     'rgba(255,255,255,0.32)',
};

const GoldGradient = `linear-gradient(135deg, ${C.goldLight} 0%, ${C.gold} 50%, #9A7A2E 100%)`;
const GoldRule     = { background: `linear-gradient(90deg, transparent, ${C.gold}, transparent)`, height: '1px' } as const;

// ─── Brand SVG icons ──────────────────────────────────────────────────────────

const InstagramIcon = ({ size = 15 }: { size?: number }) => (
  <svg
    width={size} height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
  </svg>
);

const YouTubeIcon = ({ size = 15 }: { size?: number }) => (
  <svg
    width={size} height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none" />
  </svg>
);

const WhatsAppIcon = ({ size = 15 }: { size?: number }) => (
  <svg
    width={size} height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

// ─── Social links ─────────────────────────────────────────────────────────────

const socialLinks = [
  {
    Icon: InstagramIcon,
    href: 'https://www.instagram.com/v.a._events?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
    label: 'Instagram',
  },
  {
    Icon: YouTubeIcon,
    href: 'https://www.youtube.com/@v.a.Events',
    label: 'YouTube',
  },
  {
    Icon: WhatsAppIcon,
    href: 'https://wa.me/+917598514436?text=Hi%20I%20want%20decoration',
    label: 'WhatsApp',
  },
];

// ─── Contact rows (add your own data) ────────────────────────────────────────
const contactRows = [
  { Icon: Phone,  text: '+91 7598514436',                                                                          href: 'tel:+917598514436' },
  { Icon: Mail,   text: 'v.a.events99@gmail.com',                                                                  href: 'mailto:v.a.events99@gmail.com.com' },
  { Icon: MapPin, text: 'Sodanayagar Street, Bishop Rd, Puthur, Tennur, Tiruchirappalli, Tamil Nadu 620017',  href: null },
  { Icon: Clock,  text: 'Mon – Sun: 9AM – 9PM',                                                               href: null },
];
// ─── Footer ───────────────────────────────────────────────────────────────────

const Footer = () => (
  <footer
    className="relative pt-16 pb-8 overflow-hidden"
    style={{
      background: 'rgba(4, 14, 35, 0.96)',
      borderTop:  `1px solid ${C.goldBorder}`,
    }}
  >
    {/* Ambient gold glow blobs */}
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl" style={{ background: C.gold, opacity: 0.04 }} />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full blur-3xl" style={{ background: C.gold, opacity: 0.03 }} />
    </div>

    <div style={{ ...GoldRule, opacity: 0.45 }} />

    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

        {/* ── Brand ── */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 animate-[pulseGold_2.2s_ease-in-out_infinite]"
              style={{ background: GoldGradient, boxShadow: `0 0 0 1px ${C.goldBorder}, 0 4px 16px ${C.goldGlow}` }}
            >
              <div className="w-9 h-9 rounded-full flex items-center justify-center overflow-hidden" style={{ background: 'rgba(4, 14, 35, 0.92)' }}>
                <img src={logo} alt="VA Logo" className="w-[90%] h-[90%] object-contain" />
              </div>
            </div>
            <div>
              <div className="font-display font-bold text-xl shimmer-gold">VA Decorations</div>
              <div className="text-[10px] tracking-[0.20em] uppercase font-body" style={{ color: C.textMuted }}>Premium Events</div>
            </div>
          </div>

          <p className="text-sm leading-relaxed font-body" style={{ color: C.textSecondary }}>
            Transforming your special moments into unforgettable memories with
            premium decoration services across Tamil Nadu.
          </p>

          {/* ── Social icons ── */}
          <div className="flex gap-3 mt-6">
            {socialLinks.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                style={{ background: C.goldDim, border: `1px solid ${C.goldBorder}`, color: C.gold }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background  = 'rgba(201,168,76,0.22)';
                  el.style.borderColor = 'rgba(201,168,76,0.42)';
                  // Per-platform accent on hover
                  if (label === 'Instagram') el.style.color = '#E1306C';
                  if (label === 'YouTube')   el.style.color = '#FF0000';
                  if (label === 'WhatsApp')  el.style.color = '#25D366';
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background  = C.goldDim;
                  el.style.borderColor = C.goldBorder;
                  el.style.color       = C.gold;
                }}
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>

        {/* ── Quick links ── */}
        <div>
          <h4 className="font-display font-semibold text-lg mb-5 shimmer-gold">Quick Links</h4>
          <div style={{ ...GoldRule, width: 40, marginBottom: 20, opacity: 0.6 }} />
          <ul className="space-y-3">
            {[
              { to: '/',        label: 'Home'    },
              { to: '/catalog', label: 'Catalog' },
              { to: '/contact', label: 'Contact' },
            ].map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  className="flex items-center gap-2 text-sm font-body transition-colors duration-300 hover:text-white"
                  style={{ color: C.textSecondary }}
                >
                  <span style={{ width: 16, background: GoldGradient, display: 'inline-block', height: '1px' }} />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Contact ── */}
        <div>
          <h4 className="font-display font-semibold text-lg mb-5 shimmer-gold">Get In Touch</h4>
          <div style={{ ...GoldRule, width: 40, marginBottom: 20, opacity: 0.6 }} />
          <ul className="space-y-3">
            {contactRows.map(({ Icon, text, href }) => (
              <li key={text}>
                {href ? (
                  <a href={href} className="flex items-start gap-3 text-sm font-body transition-colors duration-300 hover:text-white" style={{ color: C.textSecondary, textDecoration: 'none' }}>
                    <Icon size={15} style={{ color: C.gold, marginTop: 2 }} strokeWidth={1.8} className="shrink-0" />
                    {text}
                  </a>
                ) : (
                  <span className="flex items-start gap-3 text-sm font-body" style={{ color: C.textSecondary }}>
                    <Icon size={15} style={{ color: C.gold, marginTop: 2 }} strokeWidth={1.8} className="shrink-0" />
                    {text}
                  </span>
                )}
              </li>
            ))}
          </ul>

          <a
            href="https://wa.me/+917598514436?text=Hi%20I%20want%20decoration"
            target="_blank" rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 text-sm px-6 py-2.5 rounded-full font-body font-semibold tracking-wide transition-all duration-300 hover:scale-105 hover:brightness-110"
            style={{ background: GoldGradient, color: 'rgba(4,14,35,0.96)', boxShadow: `0 4px 18px ${C.goldGlow}` }}
          >
            <MessageCircle size={15} strokeWidth={2} />
            Chat on WhatsApp
          </a>
        </div>

      </div>

      {/* ── Bottom bar ── */}
      <div className="pt-7 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderTop: `1px solid rgba(201,168,76,0.10)` }}>
        <p className="text-xs font-body" style={{ color: C.textMuted }}>
          © {new Date().getFullYear()} VA Decorations. All rights reserved.
        </p>
        <p className="text-xs font-body" style={{ color: C.textMuted }}>
          Crafted with care in Tiruchirappalli
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;