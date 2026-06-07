// src/components/ui/StackedCardShuffle.tsx

import { useState, useRef } from 'react';
import { motion, type PanInfo } from 'framer-motion';

const CARDS = [
  { bg: '#534AB7', accent: '#AFA9EC', label: 'Drag me left',  icon: '←→' },
  { bg: '#0F6E56', accent: '#5DCAA5', label: 'Nice shuffle!', icon: '🎉' },
  { bg: '#993C1D', accent: '#F0997B', label: 'Keep going',    icon: '🔥' },
  { bg: '#993556', accent: '#ED93B1', label: 'Almost there',  icon: '♥'  },
  { bg: '#185FA5', accent: '#85B7EB', label: 'Back to start', icon: '↺'  },
];

const THRESHOLD = 100;

function getStackStyle(pos: number) {
  const rots   = [0,   -7,   7,  10,  12];
  const xOff   = [0,  -22,  22,  30,  36];
  const scales = [1, 0.88, 0.88, 0.82, 0.78];
  const zs     = [10,   2,   1,   0,   0];
  const i = Math.min(pos, 4);
  return { rotate: rots[i], x: xOff[i], scale: scales[i], zIndex: zs[i] };
}

export default function StackedCardShuffle() {
  const [order, setOrder] = useState(CARDS.map((_, i) => i));
  const dragStart = useRef(0);

  const handleDragStart = (_: unknown, info: PanInfo) => {
    dragStart.current = info.point.x;
  };

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const delta = info.point.x - dragStart.current;

    if (delta < -THRESHOLD) {
      // ← drag left: send front card to back
      setOrder(prev => {
        const next  = [...prev];
        const front = next.shift()!;
        next.push(front);
        return next;
      });
    } else if (delta > THRESHOLD) {
      // → drag right: bring last card to front
      setOrder(prev => {
        const next = [...prev];
        const last = next.pop()!;
        next.unshift(last);
        return next;
      });
    }
  };

  const visible = order.slice(0, 5);

  return (
    <div className="flex flex-col items-center gap-8 py-12">
      <div className="relative w-[260px] h-[340px]">
        {[...visible].reverse().map((cardIdx, revI) => {
          const stackPos = visible.length - 1 - revI;
          const isFront  = stackPos === 0;
          const card     = CARDS[cardIdx];
          const t        = getStackStyle(stackPos);

          return (
            <motion.div
              key={cardIdx}
              className="absolute inset-0 rounded-[20px] flex flex-col items-center justify-center gap-3"
              style={{
                background: card.bg,
                zIndex:     t.zIndex,
                border:     '0.5px solid rgba(255,255,255,0.15)',
                cursor:     isFront ? 'grab' : 'default',
              }}
              animate={{ rotate: t.rotate, x: t.x, scale: t.scale }}
              transition={{ duration: 0.35, ease: [0.34, 1.26, 0.64, 1] }}
              drag={isFront ? 'x' : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.35}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              whileDrag={{ cursor: 'grabbing' }}
            >
              <span style={{ fontSize: 42, color: card.accent }}>{card.icon}</span>
              <span className="text-base font-medium text-white tracking-wide">
                {card.label}
              </span>
              <span className="text-xs" style={{ color: card.accent, opacity: 0.8 }}>
                Card {cardIdx + 1}
              </span>
            </motion.div>
          );
        })}
      </div>

      <p className="text-sm text-gray-400 flex items-center gap-2">
        ← Drag left or right → to shuffle
      </p>
      <p className="text-xs text-gray-500 tracking-widest">
        Card {order[0] + 1} of {CARDS.length}
      </p>
    </div>
  );
}