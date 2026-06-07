// src/components/ServiceCard.tsx

import { motion, AnimatePresence } from 'framer-motion';
import type { ElementType } from 'react';

// ─── Design tokens ────────────────────────────────────────────────────────────
const C = {
  gold:          '#C9A84C',
  goldLight:     '#E8C97A',
  goldDim:       'rgba(201,168,76,0.14)',
  goldBorder:    'rgba(201,168,76,0.18)',
  goldGlow:      'rgba(201,168,76,0.28)',
  textPrimary:   'rgba(255,255,255,0.94)',
  textSecondary: 'rgba(255,255,255,0.54)',
};

const GoldGradient = `linear-gradient(135deg, ${C.goldLight} 0%, ${C.gold} 50%, #9A7A2E 100%)`;

// ─── Types ────────────────────────────────────────────────────────────────────
interface Service {
  id:          string;
  icon:        ElementType;
  category:    string;
  tagBg:       string;
  tagColor:    string;
  name:        string;
  description: string;
}

interface ServiceCardProps {
  service:  Service;
  selected: boolean;
  index:    number;
  onToggle: (id: string) => void;
}

// ─────────────────────────────────────────────────────────────────────────────

export function ServiceCard({ service, selected, index, onToggle }: ServiceCardProps) {
  const Icon = service.icon;

  return (
    <motion.div
      custom={index}
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.055, duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
      whileTap={{ scale: 0.97 }}
      onClick={() => onToggle(service.id)}
      style={{
        position:             'relative',
        cursor:               'pointer',
        borderRadius:         '16px',
        padding:              '20px 18px 18px',
        margin:               '0 auto',
        maxWidth:             320,
        width:                '100%',
        userSelect:           'none',
        WebkitUserSelect:     'none',
        background:           selected ? 'rgba(201,168,76,0.08)' : 'rgba(255,255,255,0.04)',
        backdropFilter:       'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        border:               selected ? '1.5px solid rgba(201,168,76,0.48)' : `1px solid ${C.goldBorder}`,
        boxShadow:            selected
          ? `0 0 0 2px ${C.goldGlow}, 0 8px 32px rgba(201,168,76,0.14)`
          : '0 4px 20px rgba(0,0,0,0.15)',
        transition: 'background 0.25s, border 0.25s, box-shadow 0.25s',
      }}
    >
      {/* ── Gold pulse ring when selected ── */}
      {selected && (
        <motion.div
          style={{
            position:      'absolute',
            inset:         -2,
            borderRadius:  18,
            pointerEvents: 'none',
            border:        `1.5px solid ${C.gold}`,
          }}
          animate={{
            boxShadow: [
              `0 0 8px  2px rgba(201,168,76,0.28)`,
              `0 0 22px 6px rgba(201,168,76,0.52)`,
              `0 0 8px  2px rgba(201,168,76,0.28)`,
            ],
          }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}

      {/* ── Check badge ── */}
      <AnimatePresence>
        {selected && (
          <motion.div
            key="check"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 520, damping: 22 }}
            style={{
              position:       'absolute',
              top: 12, right: 12,
              width: 20, height: 20,
              borderRadius:   '50%',
              background:     GoldGradient,
              boxShadow:      `0 2px 10px ${C.goldGlow}`,
              display:        'flex',
              alignItems:     'center',
              justifyContent: 'center',
              zIndex: 2,
            }}
          >
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
              <path d="M2 5.5L4.5 8L9 3" stroke="rgba(4,14,35,0.96)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Shimmer burst on select ── */}
      <AnimatePresence>
        {selected && (
          <motion.div
            key="shimmer"
            initial={{ opacity: 0.65, scale: 0.6 }}
            animate={{ opacity: 0, scale: 1.8 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            style={{
              position:      'absolute',
              inset:         0,
              borderRadius:  16,
              background:    'radial-gradient(circle at 50% 50%, rgba(201,168,76,0.22) 0%, transparent 70%)',
              pointerEvents: 'none',
              zIndex: 1,
            }}
          />
        )}
      </AnimatePresence>

      {/* ── Icon badge ── */}
      <motion.div
        animate={selected ? { scale: [1, 1.25, 1], rotate: [0, -6, 6, 0] } : { scale: 1 }}
        transition={{ duration: 0.45, ease: 'easeInOut' }}
        style={{
          width:          44,
          height:         44,
          borderRadius:   12,
          marginBottom:   12,
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'center',
          background:     selected ? 'rgba(201,168,76,0.20)' : C.goldDim,
          border:         `1px solid ${selected ? 'rgba(201,168,76,0.45)' : 'rgba(201,168,76,0.22)'}`,
          boxShadow:      selected ? `0 4px 16px ${C.goldGlow}` : 'none',
          transition:     'background 0.25s, border 0.25s, box-shadow 0.25s',
        }}
      >
        <Icon size={22} strokeWidth={1.7} style={{ color: C.gold }} />
      </motion.div>

      {/* ── Category tag ── */}
      <div style={{
        display:       'inline-block',
        borderRadius:  6,
        padding:       '2px 8px',
        fontSize:      10,
        fontWeight:    600,
        letterSpacing: '0.07em',
        textTransform: 'uppercase',
        background:    service.tagBg,
        color:         service.tagColor,
        border:        `0.5px solid ${C.goldBorder}`,
        marginBottom:  8,
      }}>
        {service.category}
      </div>

      {/* ── Name ── */}
      <div style={{
        fontFamily:   "'Playfair Display', serif",
        fontSize:     15,
        fontWeight:   700,
        color:        selected ? C.gold : C.textPrimary,
        marginBottom: 5,
        lineHeight:   1.25,
        transition:   'color 0.25s',
      }}>
        {service.name}
      </div>

      {/* ── Description ── */}
      <div style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize:   12,
        color:      C.textSecondary,
        lineHeight: 1.55,
      }}>
        {service.description}
      </div>
    </motion.div>
  );
}

export default ServiceCard;