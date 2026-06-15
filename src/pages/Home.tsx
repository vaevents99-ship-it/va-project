// src/pages/Home.tsx

import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { PanInfo } from 'framer-motion';
import logo from "../assets/logo.jpg";
import founderImg from "../assets/Founder.webp";
import awardImg   from "../assets/Award.webp";
import {
  Cake, Gem, Baby, Sparkles,
  Star, Zap, CheckCircle, ArrowRight, MessageCircle,
  Palette,
} from 'lucide-react';

import Testimonials from '../components/Testimonials';

/* ── Design tokens ───────────────────────────────────────────── */
const C = {
  s0: 'rgba(4, 14, 35, 0.50)',
  s1: 'rgba(4, 14, 35, 0.68)',
  s2: 'rgba(4, 14, 35, 0.58)',
  s3: 'rgba(4, 14, 35, 0.64)',
  s4: 'rgba(4, 14, 35, 0.72)',

  gold:        '#C9A84C',
  goldLight:   '#E8C97A',
  goldDim:     'rgba(201,168,76,0.14)',
  goldBorder:  'rgba(201,168,76,0.18)',
  goldGlow:    'rgba(201,168,76,0.28)',

  textPrimary:   'rgba(255,255,255,0.94)',
  textSecondary: 'rgba(255,255,255,0.50)',
  textMuted:     'rgba(255,255,255,0.30)',
};

const GoldGradient = `linear-gradient(135deg, ${C.goldLight} 0%, ${C.gold} 50%, #9A7A2E 100%)`;
const GoldRule     = { background: `linear-gradient(90deg, transparent, ${C.gold}, transparent)`, height: '1px' };

/* ── Data ────────────────────────────────────────────────────── */

const primaryServices = [
  {
    Icon: Cake,
    category: 'Celebrations',
    title: 'Birthday Celebrations',
    description: 'From intimate gatherings to grand birthday bashes, we craft magical moments that leave lasting impressions for all ages.',
  },
  {
    Icon: Gem,
    category: 'Weddings',
    title: 'Wedding Ceremonies',
    description: 'Your dream wedding brought to life with breathtaking floral arrangements, elegant draping, and stunning centrepieces.',
  },
  {
    Icon: Sparkles,
    category: 'Engagements',
    title: 'Engagement Parties',
    description: 'Mark the beginning of forever with romantic setups featuring roses, fairy lights, and personalised touches.',
  },
  {
    Icon: Baby,
    category: 'Family',
    title: 'Baby Showers',
    description: 'Welcome your little one with whimsical, gender-reveal setups that are both adorable and Instagram-worthy.',
  },
];

const whyUs = [
  { Icon: Star,        metric: '500+', unit: 'Events',       desc: 'Successfully delivered' },
  { Icon: Zap,         metric: '24hr', unit: 'Setup',        desc: 'Fast & reliable service' },
  { Icon: Palette,     metric: '∞',    unit: 'Themes',       desc: 'Tailored to your vision' },
  { Icon: CheckCircle, metric: '100%', unit: 'Satisfaction', desc: 'Guaranteed results' },
];

const shorts = [
  { id: 'LwWXTy1UKxw', label: 'Decoration Showcase' },
  { id: 'mg60zm2hnRQ', label: 'Event Highlights'    },
  { id: 'sZ9QMwJXEbc', label: 'Our Work'            },
];

/* ── Helpers ─────────────────────────────────────────────────── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.70 },
});

const HERO_IMG = 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1800&q=85';

function getStackStyle(pos: number) {
  const rots   = [-7,  0,   7,  10,  12];
  const xOff   = [-22, 0,  22,  30,  36];
  const scales = [0.88, 1, 0.88, 0.82, 0.78];
  const zs     = [2,   10,  1,   0,   0];
  const i = Math.min(pos, 4);
  return { rotate: rots[i], x: xOff[i], scale: scales[i], zIndex: zs[i] };
}

/* ── Gold Icon component ─────────────────────────────────────── */
interface GoldIconProps {
  Icon: React.ElementType;
  size?: number;
  variant?: 'ring' | 'fill';
}

const GoldIcon = ({ Icon, size = 22, variant = 'ring' }: GoldIconProps) => (
  <div
    style={{
      position:       'relative',
      width:          variant === 'fill' ? 46 : 52,
      height:         variant === 'fill' ? 46 : 52,
      display:        'flex',
      alignItems:     'center',
      justifyContent: 'center',
    }}
  >
    <div
      style={{
        position:     'absolute',
        inset:        0,
        borderRadius: variant === 'fill' ? 14 : 16,
        background:   variant === 'fill' ? GoldGradient : 'transparent',
        border:       variant === 'ring' ? `1.5px solid rgba(201,168,76,0.55)` : 'none',
        boxShadow:    `0 0 18px rgba(201,168,76,0.30), inset 0 1px 0 rgba(232,201,122,0.25)`,
      }}
    />
    {variant === 'fill' && (
      <div
        style={{
          position:     'absolute',
          inset:        3,
          borderRadius: 11,
          background:   'rgba(4,14,35,0.82)',
        }}
      />
    )}
    <Icon
      size={size}
      strokeWidth={1.6}
      style={{
        position: 'relative',
        color:    C.gold,
        filter:   `drop-shadow(0 0 6px rgba(201,168,76,0.55))`,
      }}
    />
  </div>
);

/* ── Primary service card ─────────────────────────────────────── */
interface PrimaryServiceCardProps {
  Icon: React.ElementType;
  category: string;
  title: string;
  description: string;
  index: number;
}

const PrimaryServiceCard = ({ Icon, category, title, description, index }: PrimaryServiceCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.07, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    whileHover={{ y: -4, boxShadow: `0 20px 60px rgba(0,0,0,0.25), 0 0 0 1px rgba(201,168,76,0.35)` }}
    style={{
      padding:              '24px 22px',
      borderRadius:         16,
      background:           'rgba(255,255,255,0.04)',
      backdropFilter:       'blur(14px)',
      WebkitBackdropFilter: 'blur(14px)',
      border:               `1px solid ${C.goldBorder}`,
      boxShadow:            '0 8px 32px rgba(0,0,0,0.15)',
      transition:           'box-shadow 0.3s',
      cursor:               'default',
    }}
  >
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
      <GoldIcon Icon={Icon} variant="ring" size={22} />
      <span style={{
        fontSize:      10,
        fontWeight:    600,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color:         C.gold,
        background:    C.goldDim,
        border:        `0.5px solid ${C.goldBorder}`,
        borderRadius:  6,
        padding:       '3px 9px',
        fontFamily:    "'DM Sans', sans-serif",
      }}>
        {category}
      </span>
    </div>

    <div style={{ ...GoldRule, width: 32, marginBottom: 12, opacity: 0.6 }} />

    <h3 style={{
      fontFamily: "'Playfair Display', serif",
      fontSize:   17,
      fontWeight: 700,
      color:      C.textPrimary,
      margin:     '0 0 8px',
      lineHeight: 1.3,
    }}>
      {title}
    </h3>

    <p style={{
      fontFamily: "'DM Sans', sans-serif",
      fontSize:   13,
      color:      C.textSecondary,
      lineHeight: 1.65,
      margin:     0,
    }}>
      {description}
    </p>
  </motion.div>
);

/* ── Single mute-only video iframe ──────────────────────────── */
const ShortIframe = ({ id, label }: { id: string; label: string }) => {
  const [muted, setMuted] = useState(true);
  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden">
      <iframe
        key={muted ? 'm' : 'u'}
        className="absolute inset-0 w-full h-full"
        src={`https://www.youtube.com/embed/${id}?autoplay=1&mute=${muted ? 1 : 0}&controls=1&rel=0&modestbranding=1&playsinline=1&fs=0`}
        title={label}
        allow="autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
        style={{ border: 'none' }}
      />
      <div className="absolute inset-0" style={{ zIndex: 1 }} />
      <button
        onClick={(e) => { e.stopPropagation(); setMuted(p => !p); }}
        className="absolute bottom-3 right-3 flex items-center justify-center rounded-full transition-all duration-200 hover:scale-110 active:scale-95"
        style={{
          zIndex: 3, width: '36px', height: '36px',
          background: 'rgba(4,14,35,0.80)',
          border: `1px solid ${C.goldBorder}`,
          backdropFilter: 'blur(8px)', color: C.gold,
        }}
        aria-label={muted ? 'Unmute' : 'Mute'}
      >
        {muted ? (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
            <line x1="23" y1="9" x2="17" y2="15"/>
            <line x1="17" y1="9" x2="23" y2="15"/>
          </svg>
        ) : (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
          </svg>
        )}
      </button>
      <div className="absolute inset-0 rounded-2xl pointer-events-none" style={{ zIndex: 2, border: `1px solid ${C.goldBorder}`, boxShadow: `inset 0 0 0 1px ${C.goldBorder}` }} />
    </div>
  );
};

/* ── Stacked card deck ───────────────────────────────────────── */
const ShortsStack = () => {
  const [order, setOrder] = useState(shorts.map((_, i) => i));
  const dragStartX        = useRef(0);
  const THRESHOLD         = 120;

  const handleDragStart = (_: unknown, info: PanInfo) => { dragStartX.current = info.point.x; };

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const delta = info.point.x - dragStartX.current;
    if (delta < -THRESHOLD) {
      setOrder(prev => { const next = [...prev]; const front = next.shift()!; next.push(front); return next; });
    } else if (delta > THRESHOLD) {
      setOrder(prev => { const next = [...prev]; const last = next.pop()!; next.unshift(last); return next; });
    }
  };

  const visible  = order.slice(0, Math.min(order.length, 5));
  const frontIdx = order[1];

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="relative mx-auto" style={{ width: '260px', height: '460px' }}>
        {[...visible].reverse().map((cardIdx, revI) => {
          const stackPos = visible.length - 1 - revI;
          const isFront  = stackPos === 1;
          const t        = getStackStyle(stackPos);
          const short    = shorts[cardIdx];
          return (
            <motion.div
              key={`card-${cardIdx}`}
              className="absolute inset-0 rounded-2xl overflow-hidden"
              style={{
                zIndex: t.zIndex, cursor: isFront ? 'grab' : 'default',
                boxShadow: isFront
                  ? `0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px ${C.goldBorder}, 0 0 40px ${C.goldGlow}`
                  : `0 8px 24px rgba(0,0,0,0.35), 0 0 0 1px ${C.goldBorder}`,
              }}
              animate={{ rotate: t.rotate, x: t.x, scale: t.scale }}
              transition={{ duration: 0.35, ease: [0.34, 1.26, 0.64, 1] }}
              drag={isFront ? 'x' : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.35}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              whileDrag={{ cursor: 'grabbing', scale: 1.03 }}
            >
              {isFront ? (
                <ShortIframe id={short.id} label={short.label} />
              ) : (
                <div className="w-full h-full rounded-2xl" style={{ background: `url(https://i.ytimg.com/vi/${short.id}/hqdefault.jpg) center/cover no-repeat`, filter: 'brightness(0.55)', pointerEvents: 'none' }} />
              )}
            </motion.div>
          );
        })}
      </div>

      <div className="flex flex-col items-center gap-3">
        <p className="text-sm tracking-widest uppercase font-body" style={{ color: C.gold }}>{shorts[frontIdx]?.label}</p>
        <div className="flex items-center gap-2">
          {shorts.map((_, i) => (
            <button
              key={i}
              onClick={() => setOrder(prev => { const next = [...prev]; const pos = next.indexOf(i); if (pos === 1) return prev; next.splice(pos, 1); next.splice(1, 0, i); return next; })}
              className="rounded-full transition-all duration-300"
              style={{ width: order[1] === i ? '24px' : '8px', height: '8px', background: order[1] === i ? GoldGradient : C.goldBorder, border: `1px solid ${C.goldBorder}` }}
              aria-label={`Show video ${i + 1}`}
            />
          ))}
        </div>
        <p className="flex items-center gap-2 text-xs font-body" style={{ color: C.textMuted }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          Drag left to shuffle
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: 'scaleX(-1)' }}><polyline points="15 18 9 12 15 6"/></svg>
        </p>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════
    PAGE
   ══════════════════════════════════════════════════════════════ */
const Home = () => {

  return (
    <div
      className="min-h-screen relative"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(4,14,35,0.78) 0%, rgba(6,20,50,0.72) 45%, rgba(4,14,35,0.82) 100%), url('${HERO_IMG}')`,
        backgroundSize: 'cover', backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed',
      }}
    >

      {/* ══════════════════════════════════════════
          HERO
          ══════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden" style={{ background: C.s0 }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 90% 80% at 50% 50%, transparent 42%, rgba(4,14,35,0.55) 100%)' }} />

        {[...Array(12)].map((_, i) => (
          <span key={i} className={`absolute rounded-full pointer-events-none ${['animate-sparkle', 'animate-sparkle2', 'animate-sparkle3'][i % 3]}`}
            style={{ width: i % 3 === 0 ? 6 : i % 3 === 1 ? 4 : 3, height: i % 3 === 0 ? 6 : i % 3 === 1 ? 4 : 3, background: GoldGradient, top: `${10 + i * 7.5}%`, left: `${5 + i * 8.5}%`, boxShadow: `0 0 10px ${C.goldGlow}` }} />
        ))}

        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-8 flex flex-col items-center text-center gap-7">
          <motion.div {...fadeUp(0)} className="w-[92px] h-[92px] rounded-full flex items-center justify-center animate-[pulseGold_2.2s_ease-in-out_infinite]"
            style={{ background: GoldGradient, boxShadow: `0 0 0 1px ${C.goldBorder}, 0 12px 48px ${C.goldGlow}` }}>
            <div className="w-[80px] h-[80px] rounded-full flex items-center justify-center overflow-hidden" style={{ background: 'rgba(4,14,35,0.92)' }}>
              <img src={logo} alt="VA Logo" className="w-[90%] h-[90%] object-contain" />
            </div>
          </motion.div>

          <motion.div {...fadeUp(0.12)} className="flex items-center gap-3">
            <span className="inline-block h-px w-10" style={{ background: `linear-gradient(90deg, transparent, ${C.gold})` }} />
            <span className="text-[10px] tracking-[0.28em] uppercase font-medium font-body" style={{ color: C.gold }}>Premium Event Decorations</span>
            <span className="inline-block h-px w-10" style={{ background: `linear-gradient(90deg, ${C.gold}, transparent)` }} />
          </motion.div>

          <motion.h1 {...fadeUp(0.22)} className="font-display font-bold leading-[1.02] tracking-tight text-5xl sm:text-7xl md:text-[90px]">
            <span className="block" style={{ color: C.textPrimary }}>Crafting</span>
            <span className="shimmer-gold block mt-1">Perfect Moments</span>
          </motion.h1>

          <motion.p {...fadeUp(0.32)} className="max-w-[500px] text-base sm:text-lg leading-relaxed font-body" style={{ color: C.textSecondary }}>
            From intimate birthdays to grand weddings — we bring your vision to life with breathtaking décor crafted with passion and precision.
          </motion.p>

          <motion.div {...fadeUp(0.38)} className="w-20" style={GoldRule} />

          <motion.div {...fadeUp(0.44)} className="flex justify-center">
            <Link to="/catalog" className="inline-flex items-center justify-center gap-2 px-10 py-3.5 text-sm sm:text-base font-body tracking-wide rounded-full min-w-[180px] transition-all duration-300 hover:scale-105"
              style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: `1px solid ${C.goldBorder}`, color: C.textPrimary }}>
              View Catalog <ArrowRight size={15} />
            </Link>
          </motion.div>

          <motion.div {...fadeUp(0.54)} className="flex flex-wrap justify-center gap-2.5 mt-1">
            {[
              { label: 'Birthday', Icon: Cake }, { label: 'Wedding', Icon: Gem },
              { label: 'Engagement', Icon: Sparkles }, { label: 'Baby Shower', Icon: Baby },
            ].map(({ label, Icon }) => (
              <span key={label} className="flex items-center gap-1.5 text-xs sm:text-sm px-4 py-1.5 rounded-full font-body tracking-wide"
                style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${C.goldBorder}`, color: C.textSecondary }}>
                <Icon size={12} style={{ color: C.gold }} />
                {label}
              </span>
            ))}
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-36 pointer-events-none" style={{ background: `linear-gradient(to bottom, transparent, ${C.s1})` }} />
      </section>


      {/* ══════════════════════════════════════════
          SERVICES
          ══════════════════════════════════════════ */}
      <section className="pt-24 pb-28 px-4" style={{ background: C.s1 }}>
        <div className="max-w-7xl mx-auto">

          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <p className="text-[10px] tracking-[0.28em] uppercase font-body mb-3" style={{ color: C.gold }}>What We Offer</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 shimmer-gold">Our Services</h2>
            <div className="w-16 mx-auto mb-5" style={GoldRule} />
            <p className="text-xl max-w-xl mx-auto italic font-body" style={{ color: C.textSecondary }}>
              Crafting unforgettable celebrations with passion, precision, and a touch of magic.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {primaryServices.map((s, i) => (
              <PrimaryServiceCard key={s.title} {...s} index={i} />
            ))}
          </div>

        </div>
      </section>


      {/* ══════════════════════════════════════════
          SHORTS
          ══════════════════════════════════════════ */}
      <section className="py-28 px-4" style={{ background: C.s2 }}>
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-center mb-16">
            <p className="text-[10px] tracking-[0.28em] uppercase font-body mb-3" style={{ color: C.gold }}>See It Live</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 shimmer-gold">Our Work in Action</h2>
            <div className="w-16 mx-auto mb-5" style={GoldRule} />
            <p className="text-xl max-w-xl mx-auto italic font-body" style={{ color: C.textSecondary }}>Watch real setups, real moments — straight from our events.</p>
          </motion.div>
          <ShortsStack />
        </div>
      </section>


      {/* ══════════════════════════════════════════
          WHY CHOOSE US
          ══════════════════════════════════════════ */}
      <section className="py-28 px-4" style={{ background: C.s2 }}>
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <p className="text-[10px] tracking-[0.28em] uppercase font-body mb-3" style={{ color: C.gold }}>Why VA?</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 shimmer-gold">Why Choose Us</h2>
            <div className="w-16 mx-auto mb-5" style={GoldRule} />
            <p className="text-xl italic max-w-xl mx-auto font-body" style={{ color: C.textSecondary }}>We don't just decorate — we create experiences that last a lifetime.</p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {whyUs.map(({ Icon, metric, unit, desc }, i) => (
              <motion.div key={metric + unit}
                initial={{ opacity: 0, scale: 0.88 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ delay: i * 0.10, duration: 0.5 }}
                className="p-8 text-center rounded-2xl transition-all duration-300 hover:scale-[1.03]"
                style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', border: `1px solid ${C.goldBorder}`, boxShadow: '0 8px 32px rgba(0,0,0,0.15)' }}
              >
                <div className="mx-auto mb-4 flex items-center justify-center" style={{ width: 'fit-content' }}>
                  <GoldIcon Icon={Icon} variant="ring" size={20} />
                </div>
                <div className="font-display font-bold text-3xl shimmer-gold">{metric}</div>
                <div className="font-display font-semibold text-sm mt-0.5 mb-1 tracking-wide" style={{ color: C.textPrimary }}>{unit}</div>
                <div className="text-xs font-body" style={{ color: C.textMuted }}>{desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════
          TESTIMONIALS
          ══════════════════════════════════════════ */}
      <div style={{ background: C.s3 }}>
        <Testimonials />
      </div>


      {/* ══════════════════════════════════════════
          FOUNDER & AWARD
          ══════════════════════════════════════════ */}
      <section className="py-32 px-4 relative overflow-hidden" style={{ background: C.s4 }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" style={{ width: '1000px', height: '1000px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 65%)' }} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none" style={{ width: '280px', opacity: 0.45, ...GoldRule }} />

        {[{ top: '12%', left: '4%', size: 5, delay: 0 }, { top: '80%', left: '8%', size: 4, delay: 1.1 }, { top: '20%', right: '5%', size: 6, delay: 0.5 }, { top: '70%', right: '7%', size: 4, delay: 1.6 }, { top: '45%', left: '2%', size: 3, delay: 0.9 }, { top: '55%', right: '3%', size: 3, delay: 1.3 }].map((s, i) => (
          <motion.span key={i} className="absolute rounded-full pointer-events-none"
            style={{ width: s.size, height: s.size, background: GoldGradient, top: s.top, left: (s as any).left, right: (s as any).right, boxShadow: `0 0 10px ${C.goldGlow}` }}
            animate={{ opacity: [0.2, 0.8, 0.2], scale: [0.7, 1.3, 0.7] }}
            transition={{ duration: 3 + i * 0.4, repeat: Infinity, delay: s.delay, ease: 'easeInOut' }} />
        ))}

        <div className="relative max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-center mb-20">
            <p className="text-[10px] tracking-[0.28em] uppercase font-body mb-3" style={{ color: C.gold }}>The Visionary Behind VA</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold shimmer-gold">Meet Our Founder</h2>
            <div className="w-16 mx-auto mt-5" style={GoldRule} />
          </motion.div>

          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
            <motion.div initial={{ opacity: 0, x: -60 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }} className="flex flex-col items-center lg:items-start gap-9 flex-1">
              <div className="relative flex-shrink-0">
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 16, repeat: Infinity, ease: 'linear' }} className="absolute rounded-full pointer-events-none" style={{ inset: '-8px', background: `conic-gradient(${C.gold} 0deg, transparent 100deg, ${C.goldLight} 220deg, transparent 360deg)`, opacity: 0.6 }} />
                <motion.div animate={{ rotate: -360 }} transition={{ duration: 24, repeat: Infinity, ease: 'linear' }} className="absolute rounded-full pointer-events-none" style={{ inset: '-4px', background: `conic-gradient(transparent 0deg, ${C.goldLight} 80deg, transparent 180deg, ${C.gold} 260deg, transparent 360deg)`, opacity: 0.4 }} />
                <div className="absolute rounded-full pointer-events-none" style={{ inset: '-2px', background: `linear-gradient(135deg, ${C.goldLight}, rgba(4,14,35,0.8), ${C.gold}, rgba(4,14,35,0.8), ${C.goldLight})` }} />
                <motion.div whileHover={{ scale: 1.04 }} transition={{ duration: 0.45, ease: 'easeOut' }} className="relative w-60 h-60 md:w-80 md:h-80 rounded-full overflow-hidden" style={{ boxShadow: `0 28px 90px rgba(0,0,0,0.55), 0 0 70px ${C.goldGlow}` }}>
                  <img src={founderImg} alt="Founder of VA Decorations" className="w-full h-full object-cover object-top" />
                  <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 30% 20%, rgba(201,168,76,0.13) 0%, transparent 55%)' }} />
                </motion.div>
                {[{ top: '6%', left: '-12%', size: 7, delay: 0 }, { top: '82%', left: '-9%', size: 5, delay: 0.9 }, { top: '12%', right: '-11%', size: 6, delay: 0.45 }, { top: '72%', right: '-13%', size: 8, delay: 1.3 }, { top: '48%', left: '-14%', size: 4, delay: 0.65 }].map((dot, i) => (
                  <motion.span key={i} className="absolute rounded-full pointer-events-none" style={{ width: dot.size, height: dot.size, background: GoldGradient, top: dot.top, left: (dot as any).left, right: (dot as any).right, boxShadow: `0 0 14px ${C.goldGlow}` }} animate={{ opacity: [0.3, 1, 0.3], scale: [0.7, 1.35, 0.7] }} transition={{ duration: 2.8, repeat: Infinity, delay: dot.delay, ease: 'easeInOut' }} />
                ))}
                <motion.div initial={{ opacity: 0, scale: 0.6 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.5, type: 'spring', stiffness: 200 }} className="absolute -bottom-3 -right-3 flex flex-col items-center justify-center rounded-full" style={{ width: '72px', height: '72px', background: GoldGradient, boxShadow: `0 8px 28px rgba(0,0,0,0.35), 0 0 20px ${C.goldGlow}`, border: '2px solid rgba(4,14,35,0.6)' }}>
                  <span className="font-display font-bold text-lg leading-none" style={{ color: 'rgba(4,14,35,0.92)' }}>2+</span>
                  <span className="text-[9px] font-body font-semibold tracking-wide leading-none mt-0.5" style={{ color: 'rgba(4,14,35,0.75)' }}>YRS</span>
                </motion.div>
              </div>

              <div className="text-center lg:text-left max-w-lg">
                <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.18, duration: 0.65 }}>
                  <h3 className="font-display text-3xl md:text-4xl font-bold mb-1" style={{ color: C.textPrimary }}>Mukesh</h3>
                  <p className="text-sm tracking-[0.22em] uppercase font-body mb-5" style={{ color: C.gold }}>Founder &amp; Creative Director</p>
                  <div className="w-12 mb-6" style={{ ...GoldRule, marginLeft: 0 }} />
                </motion.div>
                <motion.blockquote initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.28, duration: 0.65 }} className="mb-6 pl-5 italic text-lg font-body leading-relaxed" style={{ color: C.textPrimary, borderLeft: `3px solid ${C.gold}` }}>
                  "Every event is a once-in-a-lifetime moment — it deserves nothing less than perfection."
                </motion.blockquote>
                {['With over a decade of experience turning ordinary spaces into extraordinary celebrations, Mukesh founded VA Decorations with a single belief — every event deserves to feel like magic.', 'Her eye for detail, passion for bespoke design, and relentless pursuit of perfection have made VA the most trusted name in event décor across the region.'].map((para, i) => (
                  <motion.p key={i} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.36 + i * 0.12, duration: 0.6 }} className="text-base leading-relaxed font-body mb-4" style={{ color: C.textSecondary }}>{para}</motion.p>
                ))}
                <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.58, duration: 0.6 }} className="flex flex-wrap gap-3 justify-center lg:justify-start mt-7">
                  {[{ val: '2+', label: 'Years' }, { val: '500+', label: 'Events' }, { val: '100%', label: 'Passion' }].map(({ val, label }) => (
                    <div key={label} className="px-5 py-2.5 rounded-full flex items-center gap-2" style={{ background: C.goldDim, border: `1px solid ${C.goldBorder}` }}>
                      <span className="font-display font-bold text-lg shimmer-gold">{val}</span>
                      <span className="text-xs font-body" style={{ color: C.textMuted }}>{label}</span>
                    </div>
                  ))}
                </motion.div>
                <motion.a href="https://wa.me/+917598514436" target="_blank" rel="noopener noreferrer" initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.7, duration: 0.6 }} whileHover={{ scale: 1.05 }} className="inline-flex items-center gap-2.5 mt-8 px-7 py-3 rounded-full text-sm font-body tracking-wide transition-all duration-300" style={{ background: GoldGradient, color: 'rgba(4,14,35,0.92)', fontWeight: 600, boxShadow: `0 8px 28px rgba(0,0,0,0.25), 0 0 20px ${C.goldGlow}` }}>
                  <MessageCircle size={15} />
                  Connect with Mukesh
                </motion.a>
              </div>
            </motion.div>

            <div className="hidden lg:block w-px self-stretch" style={{ background: `linear-gradient(to bottom, transparent, ${C.goldBorder}, ${C.gold}, ${C.goldBorder}, transparent)` }} />

            <motion.div initial={{ opacity: 0, x: 60 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }} className="flex flex-col items-center gap-10 flex-1 max-w-sm w-full">
              <div className="text-center">
                <p className="text-[10px] tracking-[0.28em] uppercase font-body mb-2" style={{ color: C.gold }}>Recognition &amp; Excellence</p>
                <h3 className="font-display text-2xl md:text-3xl font-bold" style={{ color: C.textPrimary }}>Award Winning</h3>
                <div className="w-10 mx-auto mt-3" style={GoldRule} />
              </div>

              <motion.div className="relative w-full" whileHover={{ scale: 1.03 }} transition={{ duration: 0.4, ease: 'easeOut' }}>
                <motion.div className="absolute -inset-4 rounded-3xl pointer-events-none" style={{ background: `radial-gradient(ellipse at center, ${C.goldGlow} 0%, transparent 70%)` }} animate={{ opacity: [0.4, 0.9, 0.4], scale: [0.96, 1.04, 0.96] }} transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }} />
                <motion.div className="absolute -inset-8 rounded-3xl pointer-events-none" style={{ background: `radial-gradient(ellipse at center, rgba(201,168,76,0.08) 0%, transparent 65%)` }} animate={{ opacity: [0.3, 0.7, 0.3] }} transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }} />
                <div className="relative rounded-2xl overflow-hidden" style={{ border: `1px solid ${C.goldBorder}`, boxShadow: `0 24px 80px rgba(0,0,0,0.5), 0 0 60px ${C.goldGlow}` }}>
                  <img src={awardImg} alt="VA Decorations Award" className="w-full object-contain block" style={{ maxWidth: '100%' }} />
                  <motion.div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(108deg, transparent 35%, rgba(232,201,122,0.18) 50%, transparent 65%)' }} animate={{ x: ['-120%', '220%'] }} transition={{ duration: 3.8, repeat: Infinity, repeatDelay: 2.8, ease: 'easeInOut' }} />
                  <div className="absolute inset-0 pointer-events-none rounded-2xl" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.1) 0%, transparent 55%)' }} />
                </div>
                {[{ top: '-6px', left: '-6px', borderTop: `2px solid ${C.gold}`, borderLeft: `2px solid ${C.gold}`, borderRadius: '6px 0 0 0' }, { top: '-6px', right: '-6px', borderTop: `2px solid ${C.gold}`, borderRight: `2px solid ${C.gold}`, borderRadius: '0 6px 0 0' }, { bottom: '-6px', left: '-6px', borderBottom: `2px solid ${C.gold}`, borderLeft: `2px solid ${C.gold}`, borderRadius: '0 0 0 6px' }, { bottom: '-6px', right: '-6px', borderBottom: `2px solid ${C.gold}`, borderRight: `2px solid ${C.gold}`, borderRadius: '0 0 6px 0' }].map((style, i) => (
                  <span key={i} className="absolute w-5 h-5 pointer-events-none" style={style as React.CSSProperties} />
                ))}
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.45, duration: 0.65 }} className="w-full rounded-2xl p-6 text-center" style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', border: `1px solid ${C.goldBorder}`, boxShadow: '0 8px 32px rgba(0,0,0,0.15)' }}>
                <div className="mx-auto mb-4 flex items-center justify-center" style={{ width: 'fit-content' }}>
                  <GoldIcon Icon={Star} variant="fill" size={18} />
                </div>
                <p className="font-display font-bold text-xl mb-1" style={{ color: C.textPrimary }}>Best Event Decorator</p>
                <p className="text-sm font-body mb-1" style={{ color: C.gold }}>Regional Excellence Awards</p>
                <p className="text-xs font-body mb-5" style={{ color: C.textMuted }}>2024 · Trichy </p>
                <div className="flex items-center justify-center gap-1.5">
                  {[...Array(5)].map((_, i) => (
                    <motion.div key={i} initial={{ opacity: 0, scale: 0, rotate: -30 }} whileInView={{ opacity: 1, scale: 1, rotate: 0 }} viewport={{ once: true }} transition={{ delay: 0.55 + i * 0.08, duration: 0.4, type: 'spring', stiffness: 260 }}>
                      <Star size={16} fill={C.gold} style={{ color: C.gold }} />
                    </motion.div>
                  ))}
                </div>
                <p className="text-xs font-body mt-4 italic" style={{ color: C.textMuted }}>Recognised for excellence in creativity, execution &amp; client satisfaction</p>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.6, duration: 0.6 }}>
                <Link to="/catalog" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-body tracking-wide rounded-full transition-all duration-300 hover:scale-105" style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: `1px solid ${C.goldBorder}`, color: C.textPrimary }}>
                  Browse Catalog <ArrowRight size={14} />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none" style={{ width: '280px', opacity: 0.35, ...GoldRule }} />
      </section>

    </div>
  );
};

export default Home;