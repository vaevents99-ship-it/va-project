// src/components/Navbar.tsx

import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, type Variants } from 'framer-motion';
import { Menu, X, Sparkles, Home, BookOpen, Phone } from 'lucide-react';

// ─── Shared design tokens (mirrors Home.tsx) ──────────────────────────────────
const C = {
  gold:       '#C9A84C',
  goldLight:  '#E8C97A',
  goldDim:    'rgba(201,168,76,0.10)',
  goldBorder: 'rgba(201,168,76,0.18)',
  goldGlow:   'rgba(201,168,76,0.28)',

  textPrimary:   'rgba(255,255,255,0.94)',
  textSecondary: 'rgba(255,255,255,0.62)',
  textMuted:     'rgba(255,255,255,0.32)',
};

const GoldGradient = `linear-gradient(135deg, ${C.goldLight} 0%, ${C.gold} 50%, #9A7A2E 100%)`;
const GoldRule     = { background: `linear-gradient(90deg, transparent, ${C.gold}, transparent)`, height: '1px' } as const;

// ─────────────────────────────────────────────────────────────────────────────

const links = [
  { to: '/',        label: 'Home',    Icon: Home },
  { to: '/catalog', label: 'Catalog', Icon: BookOpen },
  { to: '/contact', label: 'Contact', Icon: Phone },
];

const menuVariants: Variants = {
  closed: {
    opacity: 0, scale: 0.85, y: -40,
    transition: { type: 'spring', stiffness: 300, damping: 28, when: 'afterChildren', staggerChildren: 0.05, staggerDirection: -1 },
  },
  open: {
    opacity: 1, scale: 1, y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 28, when: 'beforeChildren', staggerChildren: 0.08 },
  },
};

const itemVariants: Variants = {
  closed: { y: 16, opacity: 0, scale: 0.9 },
  open:   { y: 0,  opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 380, damping: 24 } },
};

// ─────────────────────────────────────────────────────────────────────────────

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hovered,  setHovered]  = useState<string | null>(null);
  const { pathname }            = useLocation();
  const { scrollY }             = useScroll();

  useEffect(() => {
    const unsubscribe = scrollY.onChange((latest) => {
      setScrolled(latest > 100);
      if (latest <= 100) setMenuOpen(false);
    });
    return unsubscribe;
  }, [scrollY]);

  const isActive = (to: string) => pathname === to;

  return (
    <>
      {/* ══════════════════════════════════════════
          FULL NAVBAR — visible at top of page
          ══════════════════════════════════════════ */}
      <motion.nav
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: scrolled ? -100 : 0, opacity: scrolled ? 0 : 1 }}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
        className="fixed top-0 inset-x-0 z-50"
        style={{ background: 'transparent', pointerEvents: scrolled ? 'none' : 'auto' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-end">

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-2">
            {links.map(({ to, label, Icon }) => (
              <motion.div
                key={to}
                className="relative"
                onHoverStart={() => setHovered(to)}
                onHoverEnd={() => setHovered(null)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={to}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-body text-sm tracking-[0.12em] uppercase transition-colors duration-300 relative z-10"
                  style={{ color: isActive(to) ? C.gold : C.textSecondary }}
                >
                  <Icon size={14} strokeWidth={2} />
                  {label}
                  {isActive(to) && (
                    <span
                      className="absolute bottom-1 left-4 right-4 h-px"
                      style={{ background: `linear-gradient(90deg, transparent, ${C.gold}, transparent)` }}
                    />
                  )}
                </Link>

                {/* Hover pill */}
                <AnimatePresence>
                  {hovered === to && (
                    <motion.div
                      layoutId="nav-hover-pill"
                      className="absolute inset-0 rounded-xl"
                      style={{
                        background: C.goldDim,
                        border:     `1px solid ${C.goldBorder}`,
                        zIndex:     0,
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.18 }}
                    />
                  )}
                </AnimatePresence>
              </motion.div>
            ))}

            {/* Book Now → Catalog */}
            <Link
              to="/catalog"
              className="inline-flex items-center gap-2 text-sm px-6 py-2.5 rounded-full font-body font-semibold tracking-wide ml-4 transition-all duration-300 hover:scale-105 hover:brightness-110"
              style={{
                background: GoldGradient,
                color:      'rgba(4,14,35,0.96)',
                boxShadow:  `0 4px 18px ${C.goldGlow}`,
                textDecoration: 'none',
              }}
            >
              <Sparkles size={14} strokeWidth={2} /> Book Now
            </Link>
          </div>

          {/* Mobile toggle (at top) */}
          <motion.button
            onClick={() => setMenuOpen(v => !v)}
            className="md:hidden p-2"
            style={{ color: C.gold }}
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              {menuOpen
                ? <motion.span key="x"
                    initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}
                  ><X size={24} /></motion.span>
                : <motion.span key="menu"
                    initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}
                  ><Menu size={24} /></motion.span>
              }
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.nav>


      {/* ══════════════════════════════════════════
          FLOATING HAMBURGER — appears on scroll
          ══════════════════════════════════════════ */}
      <motion.button
        onClick={() => setMenuOpen(v => !v)}
        aria-label="Open menu"
        className="fixed top-5 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center"
        style={{
          background: GoldGradient,
          color:      'rgba(4,14,35,0.96)',
          boxShadow:  `0 4px 24px ${C.goldGlow}, 0 0 0 1px ${C.goldBorder}`,
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: scrolled ? 1 : 0, opacity: scrolled ? 1 : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        whileHover={{ scale: scrolled ? 1.1  : 0 }}
        whileTap={{ scale: 0.9 }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {menuOpen
            ? <motion.span key="x"
                initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}
              ><X size={22} /></motion.span>
            : <motion.span key="menu"
                initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}
              ><Menu size={22} /></motion.span>
          }
        </AnimatePresence>
      </motion.button>


      {/* ══════════════════════════════════════════
          POPUP MENU — when scrolled
          ══════════════════════════════════════════ */}
      <AnimatePresence>
        {menuOpen && scrolled && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              className="fixed inset-0 z-40"
              style={{
                background:           'rgba(4, 14, 35, 0.85)',
                backdropFilter:       'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
              }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />

            <div
              style={{
                position:       'fixed',
                inset:          0,
                zIndex:         50,
                display:        'flex',
                alignItems:     'center',
                justifyContent: 'center',
                pointerEvents:  'none',
              }}
            >
              <motion.div
                key="popup"
                style={{
                  width:         'min(320px, 90vw)',
                  pointerEvents: 'auto',
                }}
                variants={menuVariants}
                initial="closed"
                animate="open"
                exit="closed"
              >
                <div style={{
                  position:            'relative',
                  width:               '100%',
                  background:          'rgba(255,255,255,0.05)',
                  backdropFilter:      'blur(24px)',
                  WebkitBackdropFilter:'blur(24px)',
                  border:              `1px solid ${C.goldBorder}`,
                  boxShadow:           `0 20px 60px rgba(0,0,0,0.55), 0 1px 0 rgba(201,168,76,0.10) inset`,
                  borderRadius:        '24px',
                  padding:             '32px',
                }}>

                  {/* Decorative corner dots */}
                  <span
                    className="absolute -top-1.5 -left-1.5 w-3 h-3 rounded-full"
                    style={{ background: C.gold, opacity: 0.55 }}
                  />
                  <span
                    className="absolute -bottom-1.5 -right-1.5 w-2.5 h-2.5 rounded-full"
                    style={{ background: C.goldBorder }}
                  />

                  {/* Close button */}
                  <motion.button
                    onClick={() => setMenuOpen(false)}
                    style={{
                      position:       'absolute',
                      top: '16px', right: '16px',
                      width: '32px', height: '32px',
                      borderRadius:   '50%',
                      display:        'flex',
                      alignItems:     'center',
                      justifyContent: 'center',
                      background:     C.goldDim,
                      border:         `1px solid ${C.goldBorder}`,
                      color:          C.gold,
                      cursor:         'pointer',
                    }}
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X size={14} />
                  </motion.button>

                  {/* VA brand mark inside popup */}
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center"
                      style={{ background: GoldGradient, boxShadow: `0 2px 10px ${C.goldGlow}` }}
                    >
                      <span className="font-display font-bold text-xs" style={{ color: 'rgba(4,14,35,0.96)' }}>V</span>
                    </div>
                    <span className="font-display font-semibold text-sm shimmer-gold">VA Decorations</span>
                  </div>

                  {/* Gold rule */}
                  <div style={{ ...GoldRule, marginBottom: '20px', opacity: 0.45 }} />

                  {/* Nav links */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center', width: '100%' }}>
                    {links.map(({ to, label, Icon }) => (
                      <motion.div key={to} variants={itemVariants} style={{ width: '100%' }}>
                        <Link
                          to={to}
                          onClick={() => setMenuOpen(false)}
                          style={{
                            display:        'flex',
                            alignItems:     'center',
                            justifyContent: 'center',
                            gap:            '10px',
                            width:          '100%',
                            padding:        '12px 16px',
                            borderRadius:   '14px',
                            fontSize:       '13px',
                            letterSpacing:  '0.12em',
                            textTransform:  'uppercase',
                            fontFamily:     "'DM Sans', sans-serif",
                            transition:     'all 0.2s',
                            textDecoration: 'none',
                            boxSizing:      'border-box',
                            color:      isActive(to) ? C.gold      : C.textSecondary,
                            background: isActive(to) ? C.goldDim   : 'transparent',
                            border:     isActive(to)
                              ? `1px solid ${C.goldBorder}`
                              : '1px solid rgba(255,255,255,0.06)',
                          }}
                        >
                          <Icon size={16} strokeWidth={1.8} />
                          {label}
                          {isActive(to) && (
                            <span style={{
                              width: '6px', height: '6px', borderRadius: '50%',
                              background: C.gold, flexShrink: 0,
                            }} />
                          )}
                        </Link>
                      </motion.div>
                    ))}
                  </div>

                  {/* Book Now → Catalog */}
                  <motion.div
                    variants={itemVariants}
                    style={{ marginTop: '16px', paddingTop: '16px', borderTop: `1px solid ${C.goldBorder}` }}
                  >
                    <Link
                      to="/catalog"
                      onClick={() => setMenuOpen(false)}
                      className="w-full py-3 text-sm inline-flex items-center justify-center gap-2 rounded-full font-body font-semibold tracking-wide transition-all duration-300 hover:brightness-110"
                      style={{
                        background:     GoldGradient,
                        color:          'rgba(4,14,35,0.96)',
                        boxShadow:      `0 4px 18px ${C.goldGlow}`,
                        textDecoration: 'none',
                      }}
                    >
                      <Sparkles size={14} /> Book Now
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>


      {/* ══════════════════════════════════════════
          MOBILE DRAWER — when NOT scrolled
          ══════════════════════════════════════════ */}
      <AnimatePresence>
        {menuOpen && !scrolled && (
          <motion.div
            key="drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.32 }}
            className="fixed top-20 inset-x-0 z-40 md:hidden"
            style={{
              background:          'rgba(4, 14, 35, 0.96)',
              backdropFilter:      'blur(24px)',
              WebkitBackdropFilter:'blur(24px)',
              borderTop:           `1px solid ${C.goldBorder}`,
              overflow:            'hidden',
            }}
          >
            {/* Gold rule at top of drawer */}
            <div style={{ ...GoldRule, opacity: 0.5 }} />

            <div className="px-6 py-5 flex flex-col gap-2">
              {links.map(({ to, label, Icon }) => (
                <Link
                  key={to} to={to}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3.5 rounded-xl font-body text-base tracking-[0.12em] uppercase transition-all duration-300"
                  style={{
                    textDecoration: 'none',
                    color:      isActive(to) ? C.gold    : C.textSecondary,
                    background: isActive(to) ? C.goldDim : 'transparent',
                    border:     isActive(to)
                      ? `1px solid ${C.goldBorder}`
                      : '1px solid transparent',
                  }}
                >
                  <Icon size={16} strokeWidth={1.8} />
                  {label}
                  {isActive(to) && (
                    <span
                      className="ml-auto shrink-0"
                      style={{ width: '6px', height: '6px', borderRadius: '50%', background: C.gold }}
                    />
                  )}
                </Link>
              ))}

              <div className="mt-2 pt-4" style={{ borderTop: `1px solid ${C.goldBorder}` }}>
                <Link
                  to="/catalog"
                  onClick={() => setMenuOpen(false)}
                  className="w-full py-3 text-sm inline-flex items-center justify-center gap-2 rounded-full font-body font-semibold tracking-wide transition-all duration-300 hover:brightness-110"
                  style={{
                    background:     GoldGradient,
                    color:          'rgba(4,14,35,0.96)',
                    boxShadow:      `0 4px 18px ${C.goldGlow}`,
                    textDecoration: 'none',
                  }}
                >
                  <Sparkles size={14} /> Book Now
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;