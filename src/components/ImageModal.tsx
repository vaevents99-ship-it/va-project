// src/components/ImageModal.tsx

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle, ChevronRight, SkipForward } from 'lucide-react';
import type { CatalogItem } from '../data/catalogData';

interface ImageModalProps {
  item: CatalogItem | null;
  onClose: () => void;
}

const WA_NUMBER = '+917598514436';

const C = {
  gold:          '#C9A84C',
  goldLight:     '#E8C97A',
  goldDim:       'rgba(201,168,76,0.14)',
  goldBorder:    'rgba(201,168,76,0.18)',
  goldGlow:      'rgba(201,168,76,0.28)',
  textPrimary:   'rgba(255,255,255,0.94)',
  textSecondary: 'rgba(255,255,255,0.54)',
  textMuted:     'rgba(255,255,255,0.32)',
};

const GoldGradient = `linear-gradient(135deg, ${C.goldLight} 0%, ${C.gold} 50%, #9A7A2E 100%)`;
const GoldRule     = { background: `linear-gradient(90deg, transparent, ${C.gold}, transparent)`, height: '1px' } as const;
const WA_GREEN     = { from: '#25d366', to: '#1fad53' };

const ADDON_SERVICES = [
  {
    id: 'decoration',
    label: 'Decoration',
    emoji: '🎨',
    options: ['Themed Décor Setup', 'Floral Arrangements', 'Stage Setup', 'Full Decoration Package'],
  },
  {
    id: 'garlands',
    label: 'Garlands',
    emoji: '🌸',
    options: ['Jasmine Garland', 'Rose Garland', 'Marigold Garland', 'Mixed Floral'],
  },
  {
    id: 'dj',
    label: 'DJ',
    emoji: '🎧',
    options: ['DJ with Sound System', 'DJ + Lights', 'DJ + Smoke Machine', 'Full DJ Setup'],
  },
  {
    id: 'photography',
    label: 'Photography & Videography',
    emoji: '📸',
    options: ['Videography', 'Drone Shots', 'Pre-Wedding Shoot', 'Post-Wedding Shoot', 'Full Package'],
  },
  {
    id: 'catering',
    label: 'Catering & Food Stall',
    emoji: '🍽️',
    options: ['Veg Catering', 'Non-Veg Catering', 'Food Stall Only', 'Full Catering Package'],
  },
  {
    id: 'chenda',
    label: 'Chenda Melam',
    emoji: '🥁',
    options: ['Traditional Chenda Melam', 'Panchavadyam', 'Short Performance (30 min)', 'Full Performance (1 hr)'],
  },
  {
    id: 'gifts',
    label: 'Return Gifts',
    emoji: '🎁',
    options: ['Basic Gift Pack', 'Premium Gift Pack', 'Customised Gifts', 'Sweet Boxes'],
  },
  {
    id: 'lights',
    label: 'Building Lights',
    emoji: '💡',
    options: ['LED Border Lights', 'Fairy Lights', 'Colour Flood Lights', 'Full Facade Lighting'],
  },
  {
    id: 'led',
    label: 'LED Screenings',
    emoji: '📺',
    options: ['Small LED Screen (8x6)', 'Medium LED Screen (12x8)', 'Large LED Screen (16x10)', 'Curved LED Setup'],
  },
  {
    id: 'entry',
    label: 'Entry Specials',
    emoji: '✨',
    options: ['Dance Entry', 'Cold Pyro Entry', 'Fog Entry', 'Dolls Entry', 'Grand Combo Entry'],
  },
  {
    id: 'welcome',
    label: 'Welcome Girls',
    emoji: '💐',
    options: ['2 Welcome Girls', '4 Welcome Girls', 'With Flowers', 'With Lamps (Vilakku)'],
  },
  {
    id: 'tent',
    label: 'Decorative Tent',
    emoji: '⛺',
    options: ['Canopy Tent', 'Maharaja Tent', 'Traditional Pandal', 'Modern Tensile Structure'],
  },
] as const;

type AddonId = typeof ADDON_SERVICES[number]['id'];

export function ImageModal({ item, onClose }: ImageModalProps) {
  const [step, setStep]             = useState<'detail' | 'addons'>('detail');
  const [expanded, setExpanded]     = useState<AddonId | null>(null);
  const [selections, setSelections] = useState<Partial<Record<AddonId, string>>>({});
  const scrollRef                   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (item) { setStep('detail'); setExpanded(null); setSelections({}); }
  }, [item]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = item ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [item]);

  // ── Mouse drag-to-pan ──────────────────────────────────────────────────────
  const handleImageMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = scrollRef.current;
    if (!el) return;
    e.preventDefault();
    el.style.cursor = 'grabbing';
    const startY = e.clientY + el.scrollTop;

    const onMove = (ev: MouseEvent) => {
      el.scrollTop = startY - ev.clientY;
    };
    const onUp = () => {
      el.style.cursor = 'grab';
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  };

  const handleWhatsApp = () => {
    if (!item) return;
    const imageUrl = item.image.startsWith('http')
      ? item.image
      : `${window.location.origin}${item.image}`;
    const selectedAddons = ADDON_SERVICES
      .filter(s => selections[s.id])
      .map(s => `• ${s.label}: ${selections[s.id]}`)
      .join('\n');
    const addonText = selectedAddons
      ? `\n\nAdd-on Services Selected:\n${selectedAddons}`
      : '\n\n(No additional services selected)';
    const msg = encodeURIComponent(
      `Hi! I'm interested in the following:\n\n` +
      `📦 Package: ${item.title}\n` +
      `📂 Category: ${item.category}\n` +
      `💰 Price: ${item.price}\n` +
      `🖼️ Image: ${imageUrl}` +
      addonText +
      `\n\nCould you please share more details? Thank you!`
    );
    window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, '_blank');
  };

  const toggleSelect = (serviceId: AddonId, option: string) => {
    setSelections(prev => ({
      ...prev,
      [serviceId]: prev[serviceId] === option ? undefined : option,
    }));
  };

  const selectedCount = Object.values(selections).filter(Boolean).length;

  return (
    <AnimatePresence>
      {item && (
        <>
          {/* ── Backdrop ── */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={onClose}
            style={{
              position: 'fixed', inset: 0, zIndex: 100,
              background: 'rgba(4, 14, 35, 0.90)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              cursor: 'pointer',
            }}
          />

          {/* ── Modal panel ── */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.88, y: 32 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 32 }}
            transition={{ type: 'spring', stiffness: 340, damping: 28 }}
            transformTemplate={({ scale, y }) => `translate(-50%, -50%) scale(${scale}) translateY(${y})`}
            style={{
              position: 'fixed', top: '50%', left: '50%',
              zIndex: 101,
              width: 'min(560px, 94vw)',
              maxHeight: '92vh',
              overflowY: 'auto',
              borderRadius: '20px',
              background:           'rgba(255,255,255,0.05)',
              backdropFilter:       'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border:               `1px solid ${C.goldBorder}`,
              boxShadow:            `0 30px 80px rgba(0,0,0,0.55), 0 1px 0 rgba(201,168,76,0.10) inset`,
              cursor: 'default',
            }}
            onClick={e => e.stopPropagation()}
          >
            <AnimatePresence mode="wait">

              {/* ══════════════════════════════════════════
                  STEP 1 — Detail view
                  ══════════════════════════════════════════ */}
              {step === 'detail' && (
                <motion.div
                  key="detail"
                  initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* ── Hero image (scrollable / draggable) ── */}
                  <div style={{
                    position:     'relative',
                    height:       280,
                    overflow:     'hidden',
                    borderRadius: '20px 20px 0 0',
                  }}>
                    {/* Scrollable image container */}
                    <div
                      ref={scrollRef}
                      onMouseDown={handleImageMouseDown}
                      style={{
                        width:             '100%',
                        height:            '100%',
                        overflowY:         'scroll',
                        overflowX:         'hidden',
                        scrollbarWidth:    'none',
                        msOverflowStyle:   'none',
                        cursor:            'grab',
                      } as React.CSSProperties}
                    >
                      {/* Hide WebKit scrollbar */}
                      <style>{`.modal-img-scroll::-webkit-scrollbar { display: none; }`}</style>

                      <div className="modal-img-scroll" style={{ width: '100%', height: '100%', overflowY: 'scroll', scrollbarWidth: 'none' } as React.CSSProperties}>
                        <img
                          src={item.image}
                          alt={item.title}
                          draggable={false}
                          style={{
                            width:             '100%',
                            height:            'auto',
                            display:           'block',
                            minHeight:         '100%',
                            objectFit:         'cover',
                            userSelect:        'none',
                            WebkitUserSelect:  'none',
                          } as React.CSSProperties}
                        />
                      </div>
                    </div>

                    {/* Bottom fade — hints more image below */}
                    <div style={{
                      position:      'absolute',
                      bottom:        0, left: 0, right: 0,
                      height:        56,
                      background:    'linear-gradient(to top, rgba(4,14,35,0.60) 0%, transparent 100%)',
                      pointerEvents: 'none',
                    }} />

                    {/* Bouncing scroll-hint arrow */}
                    <motion.div
                      initial={{ opacity: 0.8, y: 0 }}
                      animate={{ y: [0, 5, 0], opacity: [0.75, 0.35, 0.75] }}
                      transition={{ duration: 1.7, repeat: Infinity, ease: 'easeInOut' }}
                      style={{
                        position:      'absolute',
                        bottom:        10,
                        left:          '50%',
                        transform:     'translateX(-50%)',
                        pointerEvents: 'none',
                      }}
                    >
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path
                          d="M9 3v12M4 10l5 5 5-5"
                          stroke="rgba(201,168,76,0.75)"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </motion.div>

                    {/* Top gradient scrim */}
                    <div style={{
                      position:      'absolute',
                      inset:         0,
                      background:    'linear-gradient(to bottom, rgba(4,14,35,0.38) 0%, transparent 40%, rgba(4,14,35,0.08) 100%)',
                      pointerEvents: 'none',
                    }} />

                    {/* Category badge */}
                    <div style={{
                      position:       'absolute', top: 14, left: 14,
                      background:     'rgba(4,14,35,0.75)',
                      backdropFilter: 'blur(8px)',
                      borderRadius:   7, padding: '3px 10px',
                      fontSize:       11, fontWeight: 600,
                      letterSpacing:  '0.07em', textTransform: 'uppercase',
                      color:          C.gold,
                      fontFamily:     "'DM Sans', sans-serif",
                      border:         `0.5px solid ${C.goldBorder}`,
                    }}>
                      {item.category}
                    </div>

                    {/* Price badge */}
                    <div style={{
                      position:       'absolute', top: 14, right: 50,
                      background:     'rgba(4,14,35,0.75)',
                      backdropFilter: 'blur(8px)',
                      borderRadius:   7, padding: '3px 10px',
                      fontSize:       14, fontWeight: 700,
                      color:          C.goldLight,
                      fontFamily:     "'DM Sans', sans-serif",
                      border:         `0.5px solid rgba(232,201,122,0.28)`,
                    }}>
                      {item.price}
                    </div>

                    {/* Close button */}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={onClose}
                      style={{
                        position:       'absolute', top: 12, right: 12,
                        width:          32, height: 32,
                        borderRadius:   '50%',
                        background:     'rgba(4,14,35,0.65)',
                        backdropFilter: 'blur(8px)',
                        border:         `0.5px solid ${C.goldBorder}`,
                        display:        'flex', alignItems: 'center', justifyContent: 'center',
                        color:          C.textPrimary,
                        cursor:         'pointer',
                      }}>
                      <X size={15} />
                    </motion.button>
                  </div>

                  {/* ── Content ── */}
                  <div style={{ padding: '22px 24px 26px' }}>
                    <div style={{ ...GoldRule, width: 40, marginBottom: 16, opacity: 0.7 }} />

                    <h2 style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: 22, fontWeight: 800,
                      color: C.textPrimary,
                      margin: '0 0 10px', lineHeight: 1.25,
                    }}>
                      {item.title}
                    </h2>

                    <p style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 14, color: C.textSecondary,
                      lineHeight: 1.65, margin: '0 0 16px',
                    }}>
                      {item.description}
                    </p>

                    {/* Tags */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 22 }}>
                      {item.tags.map(tag => (
                        <span key={tag} style={{
                          background:    C.goldDim,
                          border:        `0.5px solid ${C.goldBorder}`,
                          borderRadius:  6, padding: '3px 10px',
                          fontSize:      11, color: `rgba(201,168,76,0.75)`,
                          fontFamily:    "'DM Sans', sans-serif",
                        }}>
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div style={{ ...GoldRule, opacity: 0.18, marginBottom: 20 }} />

                    <motion.button
                      whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.96 }}
                      onClick={() => setStep('addons')}
                      style={{
                        width:       '100%',
                        background:  `linear-gradient(135deg, ${WA_GREEN.from}, ${WA_GREEN.to})`,
                        border:      'none', borderRadius: 12,
                        color:       '#fff', padding: '13px 20px',
                        fontSize:    14, fontWeight: 700, cursor: 'pointer',
                        display:     'flex', alignItems: 'center', justifyContent: 'center', gap: 9,
                        fontFamily:  "'DM Sans', sans-serif",
                        boxShadow:   '0 4px 20px rgba(37,211,102,0.28)',
                      }}>
                      <MessageCircle size={17} />
                      Enquire on WhatsApp
                      <ChevronRight size={16} />
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* ══════════════════════════════════════════
                  STEP 2 — Add-on selector
                  ══════════════════════════════════════════ */}
              {step === 'addons' && (
                <motion.div
                  key="addons"
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Header */}
                  <div style={{ padding: '22px 24px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <p style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 10, fontWeight: 600,
                        letterSpacing: '0.26em', textTransform: 'uppercase',
                        color: C.gold, margin: '0 0 6px',
                      }}>
                        Step 2 of 2
                      </p>
                      <h3 style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: 19, fontWeight: 800,
                        color: C.textPrimary, margin: 0,
                      }}>
                        Add-on Services
                      </h3>
                      <p style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 12, color: C.textMuted,
                        margin: '5px 0 0',
                      }}>
                        Select what you need — or skip to enquire directly
                      </p>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                      onClick={onClose}
                      style={{
                        width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
                        background: C.goldDim,
                        border: `0.5px solid ${C.goldBorder}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: C.textPrimary, cursor: 'pointer',
                      }}>
                      <X size={15} />
                    </motion.button>
                  </div>

                  <div style={{ ...GoldRule, margin: '14px 24px 0', opacity: 0.35 }} />

                  {/* Selected count pill */}
                  <AnimatePresence>
                    {selectedCount > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                        style={{
                          margin: '12px 24px 0',
                          background: C.goldDim,
                          border: `0.5px solid ${C.goldBorder}`,
                          borderRadius: 8, padding: '7px 12px',
                          fontSize: 12, color: C.gold,
                          fontFamily: "'DM Sans', sans-serif", fontWeight: 600,
                        }}>
                        ✓ {selectedCount} service{selectedCount > 1 ? 's' : ''} selected
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Services list */}
                  <div style={{ padding: '14px 24px 0', display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {ADDON_SERVICES.map(service => {
                      const isExpanded = expanded === service.id;
                      const selected   = selections[service.id];

                      return (
                        <div key={service.id} style={{
                          borderRadius: 12,
                          border:       `0.5px solid ${selected ? 'rgba(201,168,76,0.42)' : 'rgba(255,255,255,0.07)'}`,
                          background:   selected ? C.goldDim : 'rgba(255,255,255,0.02)',
                          overflow:     'hidden',
                          transition:   'border-color 0.2s, background 0.2s',
                        }}>
                          {/* Service header row */}
                          <div
                            onClick={() => setExpanded(isExpanded ? null : service.id)}
                            style={{
                              display: 'flex', alignItems: 'center', gap: 10,
                              padding: '11px 14px', cursor: 'pointer', userSelect: 'none',
                            }}>
                            <span style={{ fontSize: 19 }}>{service.emoji}</span>
                            <span style={{
                              fontFamily: "'DM Sans', sans-serif",
                              fontSize: 13, fontWeight: 600, flex: 1,
                              color: selected ? C.gold : C.textPrimary,
                            }}>
                              {service.label}
                            </span>
                            {selected && (
                              <span style={{
                                fontFamily:   "'DM Sans', sans-serif",
                                fontSize:     11, color: `rgba(201,168,76,0.70)`,
                                maxWidth:     120, overflow: 'hidden',
                                textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                              }}>
                                {selected}
                              </span>
                            )}
                            <motion.div animate={{ rotate: isExpanded ? 90 : 0 }} transition={{ duration: 0.2 }}>
                              <ChevronRight size={14} color={C.textMuted} />
                            </motion.div>
                          </div>

                          {/* Options dropdown */}
                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                                style={{ overflow: 'hidden' }}>
                                <div style={{ padding: '0 14px 12px', display: 'flex', flexDirection: 'column', gap: 6 }}>
                                  {service.options.map(opt => {
                                    const isSelected = selected === opt;
                                    return (
                                      <motion.div
                                        key={opt}
                                        whileTap={{ scale: 0.97 }}
                                        onClick={() => toggleSelect(service.id, opt)}
                                        style={{
                                          padding:    '8px 12px', borderRadius: 8, cursor: 'pointer',
                                          border:     `0.5px solid ${isSelected ? C.goldBorder : 'rgba(255,255,255,0.08)'}`,
                                          background: isSelected ? C.goldDim : 'rgba(255,255,255,0.025)',
                                          display:    'flex', alignItems: 'center', justifyContent: 'space-between',
                                          transition: 'all 0.18s',
                                        }}>
                                        <span style={{
                                          fontFamily: "'DM Sans', sans-serif",
                                          fontSize:   13,
                                          color:      isSelected ? C.gold : C.textSecondary,
                                        }}>
                                          {opt}
                                        </span>
                                        {isSelected && (
                                          <motion.div
                                            initial={{ scale: 0 }} animate={{ scale: 1 }}
                                            style={{
                                              width: 18, height: 18, borderRadius: '50%',
                                              background: GoldGradient,
                                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                                              boxShadow: `0 2px 8px ${C.goldGlow}`,
                                            }}>
                                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                              <path d="M2 5L4 7.5L8 2.5" stroke="rgba(4,14,35,0.96)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                          </motion.div>
                                        )}
                                      </motion.div>
                                    );
                                  })}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>

                  {/* Action buttons */}
                  <div style={{ padding: '18px 24px 26px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <div style={{ ...GoldRule, opacity: 0.20, marginBottom: 4 }} />

                    <motion.button
                      whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.96 }}
                      onClick={handleWhatsApp}
                      style={{
                        width:      '100%',
                        background: `linear-gradient(135deg, ${WA_GREEN.from}, ${WA_GREEN.to})`,
                        border:     'none', borderRadius: 12,
                        color:      '#fff', padding: '13px 20px',
                        fontSize:   14, fontWeight: 700, cursor: 'pointer',
                        display:    'flex', alignItems: 'center', justifyContent: 'center', gap: 9,
                        fontFamily: "'DM Sans', sans-serif",
                        boxShadow:  '0 4px 20px rgba(37,211,102,0.25)',
                      }}>
                      <MessageCircle size={17} />
                      {selectedCount > 0 ? `Send Enquiry (${selectedCount + 1} items)` : 'Send Enquiry'}
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.97 }}
                      onClick={handleWhatsApp}
                      style={{
                        width:                '100%',
                        background:           'rgba(255,255,255,0.04)',
                        backdropFilter:       'blur(8px)',
                        WebkitBackdropFilter: 'blur(8px)',
                        border:               `0.5px solid ${C.goldBorder}`,
                        borderRadius:         12,
                        color:                C.textSecondary, padding: '11px 20px',
                        fontSize:             13, fontWeight: 600, cursor: 'pointer',
                        display:              'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
                        fontFamily:           "'DM Sans', sans-serif",
                      }}>
                      <SkipForward size={14} />
                      Skip &amp; Enquire Without Add-ons
                    </motion.button>

                    <button
                      onClick={() => setStep('detail')}
                      style={{
                        background: 'none', border: 'none', cursor: 'pointer',
                        color:      C.textMuted,
                        fontSize:   12, fontFamily: "'DM Sans', sans-serif",
                        padding:    '4px 0',
                      }}>
                      ← Back to details
                    </button>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default ImageModal;