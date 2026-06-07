// src/components/service/ServiceSelection.tsx

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ServiceCard } from "../ServiceCard";   // ✅ one level up
import { SERVICES } from "./serviceData";        // ✅ same folder

const WA_NUMBER = "919876543210";

const BUMP_STYLE = `
@keyframes badge-bump {
  0%   { transform: scale(1); }
  35%  { transform: scale(1.45); }
  65%  { transform: scale(0.88); }
  100% { transform: scale(1); }
}
.badge-bump { animation: badge-bump 0.38s cubic-bezier(.36,.07,.19,.97) both; }
`;

export function ServiceSelection() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [bumpKey, setBumpKey] = useState(0);

  const toggle = useCallback((id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
    setBumpKey((k) => k + 1);
  }, []);

  const clearAll = useCallback(() => {
    setSelected(new Set());
    setBumpKey((k) => k + 1);
  }, []);

  const selectedServices = SERVICES.filter((s) => selected.has(s.id));

  const handleWhatsApp = () => {
    const list = selectedServices.map((s) => `• ${s.name} (${s.category})`).join("\n");
    const msg = encodeURIComponent(
      `Hello! I'd like to enquire about the following services:\n\n${list}\n\nPlease share details and pricing. Thank you!`
    );
    window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, "_blank");
  };

  return (
    <>
      <style>{BUMP_STYLE}</style>

      <section
        style={{
          background: "linear-gradient(135deg, #070E1C, #0C1A36, #070E1C)",
          minHeight: "100vh",
          paddingBottom: selected.size > 0 ? 120 : 60,
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {/* ── Header ── */}
        <div style={{ textAlign: "center", padding: "60px 24px 40px" }}>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 12,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#6366f1",
              marginBottom: 12,
            }}
          >
            Build Your Perfect Event
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(26px, 5vw, 42px)",
              fontWeight: 800,
              color: "rgba(255,255,255,0.95)",
              margin: "0 0 14px",
              lineHeight: 1.15,
            }}
          >
            Select Your Services
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.28 }}
            style={{
              color: "rgba(255,255,255,0.42)",
              fontSize: 14,
              maxWidth: 480,
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            Tap any service to add it to your enquiry. Mix and match as many as you like.
          </motion.p>
        </div>

        {/* ── Grid ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: 14,
            maxWidth: 960,
            margin: "0 auto",
            padding: "0 20px",
          }}
        >
          {SERVICES.map((service, i) => (
            <ServiceCard
              key={service.id}
              service={service}
              selected={selected.has(service.id)}
              index={i}
              onToggle={toggle}
            />
          ))}
        </div>
      </section>

      {/* ── Sticky Bottom Bar ── */}
      <AnimatePresence>
        {selected.size > 0 && (
          <motion.div
            key="bottom-bar"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 340, damping: 28 }}
            style={{
              position: "fixed",
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 50,
              background: "rgba(8,15,36,0.94)",
              backdropFilter: "blur(18px)",
              WebkitBackdropFilter: "blur(18px)",
              borderTop: "0.5px solid rgba(99,102,241,0.22)",
              padding: "14px 20px",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            {/* Count badge */}
            <span
              key={bumpKey}
              className="badge-bump"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                minWidth: 30,
                height: 30,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                color: "#fff",
                fontSize: 13,
                fontWeight: 700,
                flexShrink: 0,
              }}
            >
              {selected.size}
            </span>

            {/* Preview names */}
            <div
              style={{
                flex: 1,
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                fontSize: 12.5,
                color: "rgba(255,255,255,0.55)",
              }}
            >
              {selectedServices.map((s) => s.name).join(", ")}
            </div>

            {/* Clear all */}
            <motion.button
              whileTap={{ scale: 0.88 }}
              onClick={clearAll}
              style={{
                background: "rgba(255,255,255,0.07)",
                border: "0.5px solid rgba(255,255,255,0.12)",
                borderRadius: 8,
                color: "rgba(255,255,255,0.6)",
                padding: "7px 12px",
                fontSize: 12,
                cursor: "pointer",
                flexShrink: 0,
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              ✕ Clear
            </motion.button>

            {/* WhatsApp button */}
            <motion.button
              whileTap={{ scale: 0.94 }}
              onClick={handleWhatsApp}
              style={{
                background: "linear-gradient(135deg, #25d366, #1fad53)",
                border: "none",
                borderRadius: 10,
                color: "#fff",
                padding: "10px 20px",
                fontSize: 13.5,
                fontWeight: 700,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 8,
                flexShrink: 0,
                fontFamily: "'DM Sans', sans-serif",
                boxShadow: "0 4px 18px rgba(37,211,102,0.32)",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              Enquire on WhatsApp
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}