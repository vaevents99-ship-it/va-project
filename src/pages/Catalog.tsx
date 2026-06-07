// src/pages/Catalog.tsx
import { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  catalogData,
  categories,
  type CatalogItem,
  type Category,
  type BirthdaySubcategory,
  type CorporateSubcategory,
  type WeddingorEngagementSubcategory,
  type GarlandSubcategory,
} from '../data/catalogData';
import ImageModal from '../components/ImageModal';

const HERO_IMG = 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1800&q=85';
const WHATSAPP_NUMBER = '+917598514436';

const C = {
  s0: 'rgba(4, 14, 35, 0.42)',
  s1: 'rgba(4, 14, 35, 0.65)',
  gold: '#C9A84C',
  goldLight: '#E8C97A',
  goldDim: 'rgba(201,168,76,0.10)',
  goldBorder: 'rgba(201,168,76,0.18)',
  goldGlow: 'rgba(201,168,76,0.28)',
  textPrimary: 'rgba(255,255,255,0.94)',
  textSecondary: 'rgba(255,255,255,0.50)',
  textMuted: 'rgba(255,255,255,0.30)',
};

const GoldGradient = `linear-gradient(135deg, ${C.goldLight} 0%, ${C.gold} 50%, #9A7A2E 100%)`;
const GoldRule = { background: `linear-gradient(90deg, transparent, ${C.gold}, transparent)`, height: '1px' };

const WEDDING_SUBCATEGORIES: WeddingorEngagementSubcategory[] = [
  'Entrance Decor',
  'Photobooth',
  'Reception Decor',
  'Stage Decor',
  'Mandap Decor',
  'Table Decor',
  'Floral Arrangements',
];

const BIRTHDAY_SUBCATEGORIES: BirthdaySubcategory[] = [
  'Butterfly Theme',
  'Cartoons Theme',
  'Jungle Theme',
  'Murugan Theme',
  'Prince and Queen Theme',
  'Space Theme',
];

const CORPORATE_SUBCATEGORIES: CorporateSubcategory[] = [
  'Corporate Events',
  'School or College Events',
];

const GARLAND_SUBCATEGORIES: GarlandSubcategory[] = [
  'Bridal Veni Flowers',
  'Lotus Garland',
  'Petals Garland',
  'Premium Garlands',
  'Rose Garland',
  'White Garlands',
];

const ADDON_SERVICES = [
  {
    id: 'decoration',
    name: 'Decoration',
    emoji: '🎨',
    options: ['Themed Décor Setup', 'Floral Arrangements', 'Stage Setup', 'Full Decoration Package'],
  },
  {
    id: 'dj',
    name: 'DJ',
    emoji: '🎧',
    options: ['DJ with Sound System', 'DJ + Lights', 'DJ + Smoke Machine', 'Full DJ Setup'],
  },
  {
    id: 'photography',
    name: 'Photography',
    emoji: '📸',
    options: ['Videography', 'Drone Shots', 'Pre-Wedding Shoot', 'Post-Wedding Shoot', 'Full Package'],
  },
  {
    id: 'catering',
    name: 'Catering & Food Stall',
    emoji: '🍽️',
    options: ['Veg Catering', 'Non-Veg Catering', 'Food Stall Only', 'Full Catering Package'],
  },
  {
    id: 'chenda-melam',
    name: 'Chenda Melam',
    emoji: '🥁',
    options: ['Traditional Chenda Melam', 'Panchavadyam', 'Short Performance (30 min)', 'Full Performance (1 hr)'],
  },
  {
    id: 'return-gifts',
    name: 'Return Gifts',
    emoji: '🎁',
    options: ['Basic Gift Pack', 'Premium Gift Pack', 'Customised Gifts', 'Sweet Boxes'],
  },
  {
    id: 'building-lights',
    name: 'Building Lights',
    emoji: '💡',
    options: ['LED Border Lights', 'Fairy Lights', 'Colour Flood Lights', 'Full Facade Lighting'],
  },
  {
    id: 'led-screenings',
    name: 'LED Screenings',
    emoji: '📺',
    options: ['Small LED Screen (8x6)', 'Medium LED Screen (12x8)', 'Large LED Screen (16x10)', 'Curved LED Setup'],
  },
  {
    id: 'entry-specials',
    name: 'Entry Specials',
    emoji: '✨',
    options: ['Dance Entry', 'Cold Pyro Entry', 'Fog Entry', 'Dolls Entry', 'Grand Combo Entry'],
  },
  {
    id: 'welcome-girls',
    name: 'Welcome Girls',
    emoji: '💐',
    options: ['2 Welcome Girls', '4 Welcome Girls', 'With Flowers', 'With Lamps (Vilakku)'],
  },
  {
    id: 'decorative-tent',
    name: 'Decorative Tent',
    emoji: '⛺',
    options: ['Canopy Tent', 'Maharaja Tent', 'Traditional Pandal', 'Modern Tensile Structure'],
  },
] as const;

type AddonId = typeof ADDON_SERVICES[number]['id'];

interface SelectedItem {
  id: string;
  label: string;
  category: string;
  subcategory?: string;
  image?: string;
  price?: string;
}

// ─── CategoryDropdown ─────────────────────────────────────────────────────────
function CategoryDropdown({
  label,
  categoryValue,
  allLabel,
  subcategories,
  activeCategory,
  activeSub,
  onSelect,
  onSubSelect,
}: {
  label: string;
  categoryValue: Category;
  allLabel: string;
  subcategories: readonly string[];
  activeCategory: string;
  activeSub: string | null;
  onSelect: (cat: Category) => void;
  onSubSelect: (sub: string | null) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isActive = activeCategory === categoryValue;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} style={{ position: 'relative', zIndex: open ? 500 : 120, flexShrink: 0 }}>
      <motion.button
        whileTap={{ scale: 0.93 }}
        onClick={() => {
          if (!isActive) {
            onSelect(categoryValue);
            onSubSelect(null);
          }
          setOpen((v) => !v);
        }}
        style={{
          borderRadius: 999,
          padding: '7px 16px',
          fontSize: 13,
          fontWeight: 600,
          cursor: 'pointer',
          fontFamily: "'DM Sans', sans-serif",
          transition: 'all 0.2s',
          background: isActive ? GoldGradient : 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          border: isActive ? 'none' : `1px solid ${C.goldBorder}`,
          color: isActive ? 'rgba(4,14,35,0.96)' : C.textSecondary,
          boxShadow: isActive ? `0 4px 18px ${C.goldGlow}` : 'none',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          whiteSpace: 'nowrap',
        }}
      >
        {label}
        <span
          style={{
            fontSize: 10,
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s',
            display: 'inline-block',
          }}
        >
          ▼
        </span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            key={`${categoryValue}-dropdown`}
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'fixed',
              top: 'auto',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 9999,
              background: 'rgba(6,20,50,0.97)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: `1px solid ${C.goldBorder}`,
              borderRadius: 14,
              padding: '8px',
              minWidth: 220,
              maxWidth: '90vw',
              boxShadow: `0 12px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,168,76,0.08)`,
            }}
          >
            <button
              onClick={() => {
                onSelect(categoryValue);
                onSubSelect(null);
                setOpen(false);
              }}
              style={{
                width: '100%',
                background: isActive && !activeSub ? 'rgba(201,168,76,0.14)' : 'transparent',
                border: `1px solid ${isActive && !activeSub ? 'rgba(201,168,76,0.3)' : 'transparent'}`,
                borderRadius: 8,
                padding: '8px 12px',
                cursor: 'pointer',
                color: isActive && !activeSub ? C.gold : C.textSecondary,
                fontSize: 13,
                fontWeight: 600,
                fontFamily: "'DM Sans', sans-serif",
                textAlign: 'left',
                marginBottom: 4,
              }}
            >
              {allLabel}
            </button>

            <div style={{ height: 1, background: C.goldBorder, margin: '4px 8px 6px' }} />

            {subcategories.map((sub) => {
              const active = isActive && activeSub === sub;
              return (
                <button
                  key={sub}
                  onClick={() => {
                    onSelect(categoryValue);
                    onSubSelect(sub);
                    setOpen(false);
                  }}
                  style={{
                    width: '100%',
                    background: active ? 'rgba(201,168,76,0.14)' : 'transparent',
                    border: `1px solid ${active ? 'rgba(201,168,76,0.3)' : 'transparent'}`,
                    borderRadius: 8,
                    padding: '8px 12px',
                    cursor: 'pointer',
                    color: active ? C.goldLight : C.textSecondary,
                    fontSize: 12,
                    fontFamily: "'DM Sans', sans-serif",
                    textAlign: 'left',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                  }}
                >
                  <span
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: '50%',
                      background: active ? C.gold : C.textMuted,
                      flexShrink: 0,
                    }}
                  />
                  {sub}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── EnquiryDrawer ────────────────────────────────────────────────────────────
function EnquiryDrawer({
  selections,
  onRemove,
  onClear,
}: {
  selections: SelectedItem[];
  onRemove: (id: string) => void;
  onClear: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<'items' | 'addons'>('items');
  const [expanded, setExpanded] = useState<AddonId | null>(null);
  const [addonSelections, setAddonSelections] = useState<Partial<Record<AddonId, string>>>({});

  const handleClose = () => {
    setOpen(false);
    setStep('items');
    setExpanded(null);
  };

  const toggleOption = (serviceId: AddonId, option: string) => {
    setAddonSelections((prev) => ({
      ...prev,
      [serviceId]: prev[serviceId] === option ? undefined : option,
    }));
  };

  const selectedCount = Object.values(addonSelections).filter(Boolean).length;

  const buildAndSend = () => {
    const itemLines = selections
      .map(
        (s, i) =>
          `${i + 1}. ${s.label} (${s.category}${s.subcategory ? ' › ' + s.subcategory : ''})${
            s.price ? ' — ' + s.price : ''
          }${s.image ? '\n   🖼 ' + s.image : ''}`
      )
      .join('\n\n');

    const addonLines =
      selectedCount > 0
        ? '\n\n*Add-on Services Interested In:*\n' +
          ADDON_SERVICES.filter((s) => addonSelections[s.id])
            .map((s) => `• ${s.emoji} ${s.name}: ${addonSelections[s.id]}`)
            .join('\n')
        : '';

    const message = encodeURIComponent(
      `Hello! I'd like to enquire about the following decoration items:\n\n${itemLines}${addonLines}\n\nPlease share availability and pricing. Thank you!`
    );

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
    onClear();
    setAddonSelections({});
    handleClose();
  };

  if (selections.length === 0) return null;

  return (
    <>
      <motion.button
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => { setOpen(true); setStep('items'); }}
        style={{
          position: 'fixed',
          bottom: 28,
          right: 24,
          zIndex: 200,
          background: GoldGradient,
          border: 'none',
          borderRadius: 50,
          padding: '13px 22px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          boxShadow: `0 8px 32px rgba(201,168,76,0.45)`,
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 700,
          fontSize: 14,
          color: 'rgba(4,14,35,0.96)',
          letterSpacing: '0.03em',
        }}
      >
        <span
          style={{
            background: 'rgba(4,14,35,0.22)',
            borderRadius: 999,
            width: 22,
            height: 22,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 12,
            fontWeight: 800,
          }}
        >
          {selections.length}
        </span>
        View Enquiry
        <span style={{ fontSize: 16 }}>→</span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              style={{
                position: 'fixed',
                inset: 0,
                zIndex: 300,
                background: 'rgba(4,14,35,0.72)',
                backdropFilter: 'blur(4px)',
              }}
            />

            <motion.div
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              style={{
                position: 'fixed',
                top: 0,
                right: 0,
                bottom: 0,
                width: 'min(440px, 100vw)',
                zIndex: 400,
                background: 'rgba(6,20,50,0.97)',
                backdropFilter: 'blur(20px)',
                borderLeft: `1px solid ${C.goldBorder}`,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Header */}
              <div
                style={{
                  padding: '24px 24px 16px',
                  borderBottom: `1px solid ${C.goldBorder}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexShrink: 0,
                }}
              >
                <div>
                  <p style={{ fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: C.gold, margin: '0 0 4px', fontFamily: "'DM Sans', sans-serif" }}>
                    {step === 'items' ? 'Your Selection' : 'Step 2 of 2'}
                  </p>
                  <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: C.textPrimary, margin: 0 }}>
                    {step === 'items' ? 'Enquiry List' : 'Add-on Services'}
                  </h2>
                  {step === 'addons' && (
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: C.textMuted, margin: '4px 0 0' }}>
                      Select what you need — or skip to enquire directly
                    </p>
                  )}
                </div>
                <button
                  onClick={handleClose}
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: `1px solid ${C.goldBorder}`,
                    borderRadius: 8,
                    width: 36,
                    height: 36,
                    cursor: 'pointer',
                    color: C.textSecondary,
                    fontSize: 16,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  ✕
                </button>
              </div>

              {/* Step progress bar */}
              <div style={{ display: 'flex', gap: 6, padding: '12px 24px 0', flexShrink: 0 }}>
                {(['items', 'addons'] as const).map((s) => (
                  <div
                    key={s}
                    style={{
                      flex: 1,
                      height: 3,
                      borderRadius: 999,
                      background: C.gold,
                      opacity: s === 'addons' && step === 'items' ? 0.25 : 1,
                      transition: 'opacity 0.3s',
                    }}
                  />
                ))}
              </div>

              <AnimatePresence>
                {step === 'addons' && selectedCount > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    style={{
                      margin: '12px 24px 0',
                      background: C.goldDim,
                      border: `0.5px solid ${C.goldBorder}`,
                      borderRadius: 8,
                      padding: '7px 12px',
                      fontSize: 12,
                      color: C.gold,
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: 600,
                      flexShrink: 0,
                    }}
                  >
                    ✓ {selectedCount} service{selectedCount > 1 ? 's' : ''} selected
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Scrollable body */}
              <div style={{ flex: 1, overflowY: 'auto', padding: '16px 24px' }}>
                <AnimatePresence mode="wait">
                  {step === 'items' ? (
                    <motion.div
                      key="items-step"
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -16 }}
                      transition={{ duration: 0.22 }}
                      style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
                    >
                      <AnimatePresence>
                        {selections.map((sel) => (
                          <motion.div
                            key={sel.id}
                            layout
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 40, height: 0, marginBottom: 0, padding: 0 }}
                            transition={{ duration: 0.25 }}
                            style={{
                              background: 'rgba(255,255,255,0.04)',
                              border: `1px solid ${C.goldBorder}`,
                              borderRadius: 12,
                              padding: '12px 14px',
                              display: 'flex',
                              gap: 12,
                              alignItems: 'flex-start',
                            }}
                          >
                            {sel.image && (
                              <img
                                src={sel.image}
                                alt={sel.label}
                                style={{
                                  width: 52,
                                  height: 52,
                                  borderRadius: 8,
                                  objectFit: 'cover',
                                  flexShrink: 0,
                                  border: `1px solid ${C.goldBorder}`,
                                }}
                              />
                            )}
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: C.textPrimary, marginBottom: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {sel.label}
                              </div>
                              <div style={{ fontSize: 11, color: C.gold, fontFamily: "'DM Sans', sans-serif" }}>
                                {sel.category}{sel.subcategory ? ` › ${sel.subcategory}` : ''}
                              </div>
                              {sel.price && (
                                <div style={{ fontSize: 12, color: C.goldLight, fontFamily: "'DM Sans', sans-serif", marginTop: 2 }}>
                                  {sel.price}
                                </div>
                              )}
                            </div>
                            <button
                              onClick={() => onRemove(sel.id)}
                              style={{
                                background: 'rgba(255,60,60,0.10)',
                                border: '1px solid rgba(255,60,60,0.22)',
                                borderRadius: 6,
                                width: 28,
                                height: 28,
                                cursor: 'pointer',
                                color: '#ff6b6b',
                                fontSize: 13,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                              }}
                            >
                              ✕
                            </button>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="addons-step"
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 16 }}
                      transition={{ duration: 0.22 }}
                      style={{ display: 'flex', flexDirection: 'column', gap: 8 }}
                    >
                      {ADDON_SERVICES.map((svc) => {
                        const isExpanded = expanded === svc.id;
                        const selected = addonSelections[svc.id];
                        return (
                          <div
                            key={svc.id}
                            style={{
                              borderRadius: 12,
                              border: `0.5px solid ${selected ? 'rgba(201,168,76,0.42)' : 'rgba(255,255,255,0.07)'}`,
                              background: selected ? 'rgba(201,168,76,0.08)' : 'rgba(255,255,255,0.02)',
                              overflow: 'hidden',
                              transition: 'border-color 0.2s, background 0.2s',
                            }}
                          >
                            <div
                              onClick={() => setExpanded(isExpanded ? null : svc.id)}
                              style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 14px', cursor: 'pointer', userSelect: 'none' }}
                            >
                              <span style={{ fontSize: 19 }}>{svc.emoji}</span>
                              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, flex: 1, color: selected ? C.gold : C.textPrimary }}>
                                {svc.name}
                              </span>
                              {selected && (
                                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: 'rgba(201,168,76,0.70)', maxWidth: 110, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                  {selected}
                                </span>
                              )}
                              <motion.span
                                animate={{ rotate: isExpanded ? 90 : 0 }}
                                transition={{ duration: 0.2 }}
                                style={{ display: 'inline-block', fontSize: 13, color: C.textMuted, lineHeight: 1 }}
                              >
                                ›
                              </motion.span>
                            </div>
                            <AnimatePresence>
                              {isExpanded && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                                  style={{ overflow: 'hidden' }}
                                >
                                  <div style={{ padding: '0 14px 12px', display: 'flex', flexDirection: 'column', gap: 6 }}>
                                    {svc.options.map((opt) => {
                                      const isSelected = selected === opt;
                                      return (
                                        <motion.div
                                          key={opt}
                                          whileTap={{ scale: 0.97 }}
                                          onClick={() => toggleOption(svc.id, opt)}
                                          style={{
                                            padding: '8px 12px',
                                            borderRadius: 8,
                                            cursor: 'pointer',
                                            border: `0.5px solid ${isSelected ? C.goldBorder : 'rgba(255,255,255,0.08)'}`,
                                            background: isSelected ? 'rgba(201,168,76,0.10)' : 'rgba(255,255,255,0.025)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            transition: 'all 0.18s',
                                          }}
                                        >
                                          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: isSelected ? C.gold : C.textSecondary }}>
                                            {opt}
                                          </span>
                                          {isSelected && (
                                            <motion.div
                                              initial={{ scale: 0 }}
                                              animate={{ scale: 1 }}
                                              style={{
                                                width: 18,
                                                height: 18,
                                                borderRadius: '50%',
                                                background: GoldGradient,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                boxShadow: `0 2px 8px ${C.goldGlow}`,
                                                flexShrink: 0,
                                              }}
                                            >
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
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Footer */}
              <div
                style={{
                  padding: '16px 24px 28px',
                  borderTop: `1px solid ${C.goldBorder}`,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                  flexShrink: 0,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: 13, color: C.textSecondary, fontFamily: "'DM Sans', sans-serif" }}>
                    {step === 'items'
                      ? `${selections.length} item${selections.length !== 1 ? 's' : ''} selected`
                      : `${selectedCount} add-on${selectedCount !== 1 ? 's' : ''} selected`}
                  </span>
                  {step === 'items' && (
                    <button
                      onClick={onClear}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ff6b6b', fontSize: 12, fontFamily: "'DM Sans', sans-serif", textDecoration: 'underline' }}
                    >
                      Clear all
                    </button>
                  )}
                </div>

                {step === 'items' ? (
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setStep('addons')}
                    style={{
                      width: '100%',
                      background: GoldGradient,
                      border: 'none',
                      borderRadius: 12,
                      padding: '14px',
                      cursor: 'pointer',
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: 700,
                      fontSize: 15,
                      color: 'rgba(4,14,35,0.96)',
                      letterSpacing: '0.03em',
                      boxShadow: `0 4px 20px ${C.goldGlow}`,
                    }}
                  >
                    Next: Add-on Services →
                  </motion.button>
                ) : (
                  <>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <motion.button
                        whileTap={{ scale: 0.97 }}
                        onClick={() => { setStep('items'); setExpanded(null); }}
                        style={{
                          flex: '0 0 auto',
                          background: 'rgba(255,255,255,0.05)',
                          border: `1px solid ${C.goldBorder}`,
                          borderRadius: 12,
                          padding: '14px 18px',
                          cursor: 'pointer',
                          fontFamily: "'DM Sans', sans-serif",
                          fontWeight: 600,
                          fontSize: 14,
                          color: C.textSecondary,
                        }}
                      >
                        ← Back
                      </motion.button>
                      <motion.button
                        whileTap={{ scale: 0.97 }}
                        onClick={buildAndSend}
                        style={{
                          flex: 1,
                          background: 'linear-gradient(135deg,#25d366,#1fad53)',
                          border: 'none',
                          borderRadius: 12,
                          padding: '14px',
                          cursor: 'pointer',
                          fontFamily: "'DM Sans', sans-serif",
                          fontWeight: 700,
                          fontSize: 14,
                          color: '#fff',
                          boxShadow: '0 4px 20px rgba(37,211,102,0.28)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: 8,
                        }}
                      >
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        {selectedCount > 0 ? `Send Enquiry (${selectedCount} add-on${selectedCount !== 1 ? 's' : ''})` : 'Send Enquiry'}
                      </motion.button>
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      onClick={buildAndSend}
                      style={{
                        width: '100%',
                        background: 'rgba(255,255,255,0.04)',
                        backdropFilter: 'blur(8px)',
                        WebkitBackdropFilter: 'blur(8px)',
                        border: `0.5px solid ${C.goldBorder}`,
                        borderRadius: 12,
                        padding: '11px',
                        cursor: 'pointer',
                        fontFamily: "'DM Sans', sans-serif",
                        fontWeight: 600,
                        fontSize: 13,
                        color: C.textSecondary,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 7,
                      }}
                    >
                      ⏭ Skip &amp; Enquire Without Add-ons
                    </motion.button>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── CatalogCard ──────────────────────────────────────────────────────────────
function CatalogCard({
  item,
  index,
  onClick,
  onAddToEnquiry,
  isSelected,
}: {
  item: CatalogItem;
  index: number;
  onClick: () => void;
  onAddToEnquiry: (item: CatalogItem) => void;
  isSelected: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: index * 0.06, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        borderRadius: 16,
        overflow: 'hidden',
        cursor: 'pointer',
        background: isSelected ? 'rgba(201,168,76,0.07)' : 'rgba(255,255,255,0.04)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        border: `1px solid ${isSelected ? 'rgba(201,168,76,0.55)' : hovered ? 'rgba(201,168,76,0.42)' : C.goldBorder}`,
        boxShadow: isSelected
          ? `0 0 0 2px rgba(201,168,76,0.18), 0 8px 32px rgba(201,168,76,0.18)`
          : hovered
          ? `0 8px 32px rgba(201,168,76,0.14)`
          : '0 4px 20px rgba(0,0,0,0.18)',
        position: 'relative',
        transition: 'border-color 0.25s, box-shadow 0.25s, background 0.25s',
      }}
    >
      {isSelected && (
        <div
          style={{
            position: 'absolute',
            top: 8,
            right: 8,
            zIndex: 10,
            background: GoldGradient,
            borderRadius: 999,
            width: 22,
            height: 22,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 12,
            fontWeight: 800,
            color: 'rgba(4,14,35,0.96)',
            boxShadow: `0 2px 8px ${C.goldGlow}`,
          }}
        >
          ✓
        </div>
      )}

      <div onClick={onClick} style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden' }}>
        <motion.img
          src={item.image}
          alt={item.title}
          animate={{ scale: hovered ? 1.07 : 1 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
        <div
          style={{
            position: 'absolute',
            top: 12,
            left: 12,
            background: 'rgba(4,14,35,0.75)',
            backdropFilter: 'blur(8px)',
            borderRadius: 7,
            padding: '3px 10px',
            fontSize: 11,
            fontWeight: 600,
            color: C.gold,
            letterSpacing: '0.07em',
            textTransform: 'uppercase',
            fontFamily: "'DM Sans', sans-serif",
            border: `0.5px solid ${C.goldBorder}`,
          }}
        >
          {item.category}
        </div>
        <div
          style={{
            position: 'absolute',
            top: 12,
            right: isSelected ? 38 : 12,
            background: 'rgba(4,14,35,0.75)',
            backdropFilter: 'blur(8px)',
            borderRadius: 7,
            padding: '3px 10px',
            fontSize: 13,
            fontWeight: 700,
            color: C.goldLight,
            fontFamily: "'DM Sans', sans-serif",
            border: `0.5px solid rgba(232,201,122,0.28)`,
          }}
        >
          {item.price}
        </div>
        <AnimatePresence>
          {hovered && (
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ position: 'absolute', inset: 0, background: 'rgba(201,168,76,0.12)' }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.82, y: 6 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.82, y: 6 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  background: 'rgba(4,14,35,0.78)',
                  backdropFilter: 'blur(10px)',
                  border: `1px solid rgba(201,168,76,0.38)`,
                  borderRadius: 10,
                  padding: '8px 20px',
                  color: C.gold,
                  fontSize: 13,
                  fontWeight: 600,
                  fontFamily: "'DM Sans', sans-serif",
                  whiteSpace: 'nowrap',
                }}
              >
                View Details →
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div style={{ padding: '14px 16px 14px' }}>
        <h3
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 17,
            fontWeight: 700,
            color: C.textPrimary,
            margin: '0 0 6px',
            lineHeight: 1.3,
          }}
        >
          {item.title}
        </h3>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13,
            color: C.textSecondary,
            margin: '0 0 10px',
            lineHeight: 1.55,
          }}
        >
          {item.description}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
          {item.tags.map((tag) => (
            <span
              key={tag}
              style={{
                background: C.goldDim,
                border: `0.5px solid ${C.goldBorder}`,
                borderRadius: 5,
                padding: '2px 8px',
                fontSize: 11,
                color: `rgba(201,168,76,0.72)`,
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              #{tag}
            </span>
          ))}
        </div>
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={(e) => {
            e.stopPropagation();
            onAddToEnquiry(item);
          }}
          style={{
            width: '100%',
            borderRadius: 8,
            padding: '9px 0',
            fontSize: 12,
            fontWeight: 700,
            cursor: 'pointer',
            fontFamily: "'DM Sans', sans-serif",
            letterSpacing: '0.04em',
            transition: 'all 0.2s',
            background: isSelected ? 'rgba(255,60,60,0.10)' : C.goldDim,
            border: isSelected ? '1px solid rgba(255,60,60,0.28)' : `1px solid ${C.goldBorder}`,
            color: isSelected ? '#ff8080' : C.gold,
          }}
        >
          {isSelected ? '✕ Remove from Enquiry' : '+ Add to Enquiry'}
        </motion.button>
      </div>
    </motion.div>
  );
}

// ─── Catalog Page ─────────────────────────────────────────────────────────────
export function Catalog() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [activeSub, setActiveSub] = useState<string | null>(null);
  const [modalItem, setModalItem] = useState<CatalogItem | null>(null);
  const [enquiryItems, setEnquiryItems] = useState<SelectedItem[]>([]);
  const pillRowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (pillRowRef.current) {
      const el = pillRowRef.current;
      (el.style as any).msOverflowStyle = 'none';
      (el.style as any).scrollbarWidth = 'none';
      const style = document.createElement('style');
      style.textContent = '.pill-row::-webkit-scrollbar { display: none; }';
      document.head.appendChild(style);
      el.classList.add('pill-row');
    }
  }, []);

  const DROPDOWN_CATEGORIES: Category[] = ['Wedding & Engagement', 'Birthday', 'Corporate Events', 'Garlands'];

  const DROPDOWN_CONFIG: Record<string, { allLabel: string; subcategories: readonly string[] }> = {
    'Wedding & Engagement': {
      allLabel: 'All Wedding & Engagement',
      subcategories: WEDDING_SUBCATEGORIES,
    },
    'Birthday': {
      allLabel: 'All Birthday Themes',
      subcategories: BIRTHDAY_SUBCATEGORIES,
    },
    'Corporate Events': {
      allLabel: 'All Corporate Events',
      subcategories: CORPORATE_SUBCATEGORIES,
    },
    'Garlands': {
      allLabel: 'All Garlands',
      subcategories: GARLAND_SUBCATEGORIES,
    },
  };

  const filtered = useMemo(() => {
    return catalogData.filter((item) => {
      const matchCat = activeCategory === 'All' || item.category === activeCategory;
      const matchSub =
        !DROPDOWN_CATEGORIES.includes(activeCategory as Category) ||
        !activeSub ||
        item.subcategory === activeSub;
      const q = search.trim().toLowerCase();
      const matchSearch =
        q === '' ||
        item.title.toLowerCase().includes(q) ||
        item.tags.some((t) => t.toLowerCase().includes(q));
      return matchCat && matchSub && matchSearch;
    });
  }, [search, activeCategory, activeSub]);

  const selectedIds = new Set(enquiryItems.map((e) => e.id));

  const handleAddToEnquiry = (item: CatalogItem) => {
    setEnquiryItems((prev) => {
      if (prev.find((e) => e.id === String(item.id))) {
        return prev.filter((e) => e.id !== String(item.id));
      }
      return [
        ...prev,
        {
          id: String(item.id),
          label: item.title,
          category: item.category,
          subcategory: item.subcategory,
          image: item.image,
          price: item.price,
        },
      ];
    });
  };

  const handleRemoveFromEnquiry = (id: string) => {
    setEnquiryItems((prev) => prev.filter((e) => e.id !== id));
  };

  const handleCategorySelect = (cat: Category) => {
    setActiveCategory(cat);
    setActiveSub(null);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        fontFamily: "'DM Sans', sans-serif",
        overflowX: 'hidden',
        backgroundImage: `
          linear-gradient(to bottom,
            rgba(4, 14, 35, 0.78) 0%,
            rgba(6, 20, 50, 0.72) 45%,
            rgba(4, 14, 35, 0.82) 100%
          ),
          url('${HERO_IMG}')
        `,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* ── Hero / Filter header ── */}
      <div
        style={{
          background: C.s0,
          textAlign: 'center',
          padding: '80px 0 40px',
          position: 'relative',
          overflow: 'visible',
          zIndex: 20,
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: 0,
            transform: 'translateX(-50%)',
            width: 'min(600px, 100vw)',
            height: 400,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 68%)',
            pointerEvents: 'none',
          }}
        />

        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{ width: 60, margin: '0 auto 20px', ...GoldRule }}
        />

        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            fontSize: 11,
            letterSpacing: '0.26em',
            textTransform: 'uppercase',
            color: C.gold,
            marginBottom: 12,
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          Explore Our Collection
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="shimmer-gold"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(30px, 5vw, 52px)',
            fontWeight: 800,
            margin: '0 0 10px',
            lineHeight: 1.12,
          }}
        >
          Decoration Catalog
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          style={{
            color: C.textSecondary,
            fontSize: 15,
            fontStyle: 'italic',
            marginBottom: 28,
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          Handpicked designs for every celebration
        </motion.p>

        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 0.12, duration: 0.6, ease: 'easeOut' }}
          style={{ width: 40, margin: '0 auto 30px', ...GoldRule }}
        />

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18 }}
          style={{ maxWidth: 440, margin: '0 auto 22px', padding: '0 20px' }}
        >
          <input
            type="text"
            placeholder="Search by name or tag…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%',
              boxSizing: 'border-box',
              background: 'rgba(255,255,255,0.05)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: `1px solid ${C.goldBorder}`,
              borderRadius: 12,
              padding: '12px 18px',
              fontSize: 14,
              color: C.textPrimary,
              outline: 'none',
              fontFamily: "'DM Sans', sans-serif",
              caretColor: C.gold,
              transition: 'border-color 0.2s',
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = `rgba(201,168,76,0.55)`)}
            onBlur={(e) => (e.currentTarget.style.borderColor = C.goldBorder)}
          />
        </motion.div>

        {/* ── Category filter pills ── */}
        <motion.div
          ref={pillRowRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.24 }}
          style={{
            display: 'flex',
            gap: 8,
            overflowX: 'auto',
            WebkitOverflowScrolling: 'touch' as React.CSSProperties['WebkitOverflowScrolling'],
            alignItems: 'flex-start',
            justifyContent: 'center',
            flexWrap: 'wrap',
            position: 'relative',
            zIndex: 30,
            padding: '0 20px',
            paddingBottom: 160,
            marginBottom: -160,
          }}
        >
          {categories.map((cat) => {
            if (DROPDOWN_CATEGORIES.includes(cat as Category)) {
              const config = DROPDOWN_CONFIG[cat];
              return (
                <CategoryDropdown
                  key={cat}
                  label={cat}
                  categoryValue={cat as Category}
                  allLabel={config.allLabel}
                  subcategories={config.subcategories}
                  activeCategory={activeCategory}
                  activeSub={activeSub}
                  onSelect={handleCategorySelect}
                  onSubSelect={setActiveSub}
                />
              );
            }

            const active = activeCategory === cat;
            return (
              <motion.button
                key={cat}
                whileTap={{ scale: 0.93 }}
                onClick={() => {
                  setActiveCategory(cat as Category);
                  setActiveSub(null);
                }}
                style={{
                  flexShrink: 0,
                  borderRadius: 999,
                  padding: '7px 20px',
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontFamily: "'DM Sans', sans-serif",
                  transition: 'all 0.2s',
                  background: active ? GoldGradient : 'rgba(255,255,255,0.05)',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                  border: active ? 'none' : `1px solid ${C.goldBorder}`,
                  color: active ? 'rgba(4,14,35,0.96)' : C.textSecondary,
                  boxShadow: active ? `0 4px 18px ${C.goldGlow}` : 'none',
                  whiteSpace: 'nowrap',
                }}
              >
                {cat}
              </motion.button>
            );
          })}
        </motion.div>

        {/* ── Active subcategory breadcrumb ── */}
        <AnimatePresence>
          {DROPDOWN_CATEGORIES.includes(activeCategory as Category) && activeSub && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              style={{
                marginTop: 14,
                position: 'relative',   // ← FIX: establishes stacking context
                zIndex: 40,             // ← FIX: above the pill row's z:30 overflow area
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                padding: '0 20px',
              }}
            >
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: C.textMuted }}>
                {activeCategory} ›
              </span>
              <span
                style={{
                  background: 'rgba(201,168,76,0.12)',
                  border: `1px solid ${C.goldBorder}`,
                  borderRadius: 999,
                  padding: '3px 12px',
                  fontSize: 12,
                  fontWeight: 600,
                  color: C.goldLight,
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                {activeSub}
              </span>
              <button
                onClick={() => setActiveSub(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: C.textMuted,
                  fontSize: 12,
                  padding: '0 2px',
                }}
              >
                ✕
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Catalog grid ── */}
      <div
        style={{
          background: C.s1,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(264px, 1fr))',
          gap: 18,
          maxWidth: 1100,
          margin: '0 auto',
          padding: '36px 20px 120px',
          boxSizing: 'border-box',
          width: '100%',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((item, i) => (
            <CatalogCard
              key={item.id}
              item={item}
              index={i}
              onClick={() => setModalItem(item)}
              onAddToEnquiry={handleAddToEnquiry}
              isSelected={selectedIds.has(String(item.id))}
            />
          ))}
        </AnimatePresence>

        {filtered.length === 0 && (
          <div
            style={{
              gridColumn: '1 / -1',
              textAlign: 'center',
              color: C.textMuted,
              padding: '80px 0',
              fontSize: 15,
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            No decorations found — try a different search or category.
          </div>
        )}
      </div>

      <ImageModal item={modalItem} onClose={() => setModalItem(null)} />

      <AnimatePresence>
        {enquiryItems.length > 0 && (
          <EnquiryDrawer
            key="enquiry"
            selections={enquiryItems}
            onRemove={handleRemoveFromEnquiry}
            onClear={() => setEnquiryItems([])}
          />
        )}
      </AnimatePresence>
    </div>
  );
}