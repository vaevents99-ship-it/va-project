// src/components/Testimonials.tsx

import { useRef } from 'react';
import { useScroll, useTransform, useMotionTemplate, motion } from 'framer-motion';

const C = {
  gold:       '#C9A84C',
  goldLight:  '#E8C97A',
  goldDim:    'rgba(201,168,76,0.14)',
  goldBorder: 'rgba(201,168,76,0.22)',
  goldGlow:   'rgba(201,168,76,0.28)',

  textPrimary:   '#ffffff',                  // pure white — max contrast on card
  textSecondary: 'rgba(255,255,255,0.75)',   // bumped from 0.50
  textMuted:     'rgba(255,255,255,0.50)',   // bumped from 0.32
};

const GoldGradient = `linear-gradient(135deg, ${C.goldLight} 0%, ${C.gold} 50%, #9A7A2E 100%)`;
const GoldRule     = { background: `linear-gradient(90deg, transparent, ${C.gold}, transparent)`, height: '1px' } as const;

const TESTIMONIALS = [
  {
    id: 'testimonial-1',
    name: 'Hemalatha Anbalagan',
    event: 'House Warming Ceremony',
    rating: 5,
    description:
      'Thanks for the decor. Got to know VA events from my cousin. We booked them for our house warming ceremony. They totally did understand our needs and delivered exactly what we wanted and even gave their suggestions. Flowers they used were so fresh for almost 4 days. Greatly satisfied work. Highly recommended. & Also kudos to their punctuality!!',
    avatar: 'HA',
  },
  {
    id: 'testimonial-2',
    name: 'Aarthi Anandh',
    event: 'Marriage Ceremony',
    rating: 5,
    description:
      `Great work by VA Events. We used to book them for all our family events including my marriage and recently for my sister-in-law's marriage. Their decoration is always up to the mark and they never fail to meet our expectations. Thank you VA events for the beautiful Lighting, Decoration and the Garland. We will always keep choosing you.`,
    avatar: 'AA',
  },
  {
    id: 'testimonial-3',
    name: 'Praveen Daniel',
    event: 'Birthday Ceremony',
    rating: 5,
    description:
      `We are extremely happy with the decoration done for my son's 1st birthday. The pricing was very reasonable and truly cheap and best for the quality they delivered. Everything was completed on time and exactly as promised, making the celebration memorable for our family and guests. Highly recommended for birthday and special events. Great value for money! 🎉🎂`,
    avatar: 'PD',
  },
  {
    id: 'testimonial-4',
    name: 'Sudharsan',
    event: 'Stage Decorations',
    rating: 5,
    description:
      'This stage decoration is a great budget-friendly option that anyone can try. Every detail is carefully done, and it looks really beautiful. I highly recommend everyone to give it a try.',
    avatar: 'S',
  },
];

// ─── Animated card ────────────────────────────────────────────────────────────

const AnimatedCard = ({
  t,
  index,
  total,
  scrollYProgress,
}: {
  t: typeof TESTIMONIALS[0];
  index: number;
  total: number;
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress'];
}) => {
  const start = index / (total + 1);
  const end   = (index + 1) / (total + 1);

  const rotateRange  = [start - 0.3, end / 1.5];
  const initRotation = -index * 8 + 24;

  const y         = useTransform(scrollYProgress, [start, end], ['0%', '-160%']);
  const rotate    = useTransform(scrollYProgress, rotateRange, [initRotation, 0]);
  const transform = useMotionTemplate`translateZ(${index * 10}px) translateY(${y}) rotate(${rotate}deg)`;

  return (
    <motion.div
      style={{
        position:           'absolute',
        top:                index * 10,
        width:              '100%',
        height:             '100%',
        transform,
        zIndex:             (total - index) * 10,
        backfaceVisibility: 'hidden',
        borderRadius:       '24px',
        willChange:         'transform',
      }}
    >
      <div
        style={{
          width:               '100%',
          height:              '100%',
          borderRadius:        '24px',
          /*
           * KEY FIX — dark enough base so white text always pops,
           * but still uses blur so the gold bg glow bleeds through softly.
           * rgba(8, 20, 50, 0.92) is near-opaque obsidian — no background
           * bleed can wash out the text at this opacity.
           */
          background:          'rgba(8, 20, 50, 0.92)',
          backdropFilter:      'blur(24px)',
          WebkitBackdropFilter:'blur(24px)',
          border:              `1px solid ${C.goldBorder}`,
          boxShadow:           `0 24px 64px rgba(0,0,0,0.50), 0 1px 0 rgba(201,168,76,0.14) inset`,
          padding:             '32px 28px',
          display:             'flex',
          flexDirection:       'column',
          justifyContent:      'space-between',
          gap:                 '20px',
        }}
      >
        {/* Stars + divider + quote */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center', textAlign: 'center' }}>

          {/* Stars */}
          <div style={{ display: 'flex', gap: '4px' }}>
            {Array.from({ length: 5 }).map((_, i) => {
              const filled = i < Math.floor(t.rating);
              const half   = !filled && i < t.rating;
              return (
                <svg key={i} width="16" height="16" viewBox="0 0 20 20"
                  fill={filled ? C.gold : half ? 'url(#half-gold)' : C.goldDim}
                >
                  {half && (
                    <defs>
                      <linearGradient id="half-gold">
                        <stop offset="50%" stopColor={C.gold} />
                        <stop offset="50%" stopColor={C.goldDim} />
                      </linearGradient>
                    </defs>
                  )}
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.54-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.05 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
                </svg>
              );
            })}
          </div>

          {/* Gold divider */}
          <div style={{ width: '40px', ...GoldRule }} />

          {/* Quote — pure white, slightly larger, stronger weight */}
          <blockquote style={{
            fontSize:   '15px',
            fontWeight: 500,             // bumped from default 400
            lineHeight: 1.75,
            color:      C.textPrimary,   // now pure #ffffff
            fontStyle:  'italic',
            margin:     0,
            fontFamily: "'DM Sans', sans-serif",
            textShadow: '0 1px 8px rgba(0,0,0,0.55)',   // crisp lift off bg
          }}>
            "{t.description}"
          </blockquote>
        </div>

        {/* Author */}
        <div style={{
          display:    'flex',
          alignItems: 'center',
          gap:        '14px',
          paddingTop: '16px',
          borderTop:  `1px solid ${C.goldBorder}`,
        }}>
          {/* Avatar */}
          <div style={{
            width:           '44px',
            height:          '44px',
            borderRadius:    '50%',
            background:      GoldGradient,
            display:         'flex',
            alignItems:      'center',
            justifyContent:  'center',
            fontWeight:      700,
            fontSize:        '14px',
            color:           'rgba(4,14,35,0.96)',
            flexShrink:      0,
            boxShadow:       `0 2px 14px ${C.goldGlow}`,
          }}>
            {t.avatar}
          </div>

          <div>
            <p style={{
              fontSize:   '15px',
              fontWeight: 700,             // bumped from 600
              color:      C.textPrimary,   // pure white
              margin:     0,
              fontFamily: "'DM Sans', sans-serif",
              textShadow: '0 1px 6px rgba(0,0,0,0.4)',
            }}>
              {t.name}
            </p>
            <p style={{
              fontSize:      '11px',
              letterSpacing: '0.10em',
              textTransform: 'uppercase',
              color:         C.gold,
              margin:        0,
              marginTop:     '3px',
              fontFamily:    "'DM Sans', sans-serif",
            }}>
              {t.event}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ─── Testimonials section ─────────────────────────────────────────────────────

const Testimonials = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target:  sectionRef,
    offset:  ['start start', 'end end'],
  });

  return (
    <section style={{ background: 'transparent' }}>   {/* slightly darker than before */}

      {/* ── Header ── */}
      <div style={{ textAlign: 'center', padding: '80px 32px 40px' }}>

        <div style={{ width: '60px', margin: '0 auto 20px', ...GoldRule }} />

        <p style={{
          fontSize:      '11px',
          letterSpacing: '0.26em',
          textTransform: 'uppercase',
          color:         C.gold,
          marginBottom:  '12px',
          fontFamily:    "'DM Sans', sans-serif",
        }}>
          What Our Clients Say
        </p>

        <h2
          className="shimmer-gold font-display"
          style={{
            fontSize:     'clamp(32px, 5vw, 52px)',
            fontWeight:   700,
            lineHeight:   1.15,
            marginBottom: '16px',
          }}
        >
          Stories of Unforgettable Events
        </h2>

        <div style={{ width: '40px', margin: '0 auto 16px', ...GoldRule }} />

        <p style={{
          fontSize:   '15px',            // bumped from 14px
          color:      C.textSecondary,   // now 0.75 opacity
          maxWidth:   '460px',
          margin:     '0 auto',
          lineHeight: 1.7,
          fontStyle:  'italic',
          fontFamily: "'DM Sans', sans-serif",
        }}>
          Hundreds of families and organisations have trusted VA Decorations
          to make their most important moments shine.
        </p>
      </div>

      {/* ── Tall scroll area with sticky card stack ── */}
      <div ref={sectionRef} style={{ position: 'relative', height: '300vh' }}>
        <div style={{
          position:       'sticky',
          top:            0,
          height:         '100vh',
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'center',
          perspective:    '1000px',
          overflow:       'hidden',
        }}>
          {/* Ambient gold glow */}
          <div style={{
            position:     'absolute',
            top:          '50%',
            left:         '50%',
            transform:    'translate(-50%, -50%)',
            width:        '520px',
            height:       '520px',
            borderRadius: '50%',
            background:   `radial-gradient(circle, rgba(201,168,76,0.10) 0%, transparent 68%)`,
            pointerEvents:'none',
          }} />

          {/* Card stack */}
          <div style={{ position: 'relative', width: '340px', height: '460px' }}>
            {TESTIMONIALS.map((t, index) => (
              <AnimatedCard
                key={t.id}
                t={t}
                index={index + 2}
                total={TESTIMONIALS.length}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </div>

      <div style={{ height: '80px' }} />
    </section>
  );
};

export default Testimonials;