// src/components/service/serviceData.ts

import type { ElementType } from 'react';
import {
  Palette, Flower2, Music2, Camera, UtensilsCrossed,
  Drama, Gift, Lightbulb, MonitorPlay, Sparkles, Users, Tent,
} from 'lucide-react';

export interface Service {
  id:          string;
  name:        string;
  description: string;
  icon:        ElementType;
  category:    string;
  tagBg:       string;
  tagColor:    string;
}

export const SERVICES: Service[] = [
  {
    id:          'decoration',
    name:        'Decoration',
    description: 'Themed décor, floral arrangements & stage setup',
    icon:        Palette,
    category:    'Décor',
    tagBg:       'rgba(99,102,241,0.15)',
    tagColor:    '#a5b4fc',
  },
  {
    id:          'garlands',
    name:        'Garlands',
    description: 'Fresh & artificial flower garlands for all occasions',
    icon:        Flower2,
    category:    'Floral',
    tagBg:       'rgba(236,72,153,0.15)',
    tagColor:    '#f9a8d4',
  },
  {
    id:          'dj',
    name:        'DJ',
    description: 'Professional DJ with sound & lighting systems',
    icon:        Music2,
    category:    'Music',
    tagBg:       'rgba(16,185,129,0.15)',
    tagColor:    '#6ee7b7',
  },
  {
    id:          'photography',
    name:        'Photography',
    description: 'Candid & portrait photography + videography',
    icon:        Camera,
    category:    'Media',
    tagBg:       'rgba(245,158,11,0.15)',
    tagColor:    '#fcd34d',
  },
  {
    id:          'catering',
    name:        'Catering & Food Stall',
    description: 'Full catering service with live food counters',
    icon:        UtensilsCrossed,
    category:    'Food',
    tagBg:       'rgba(239,68,68,0.15)',
    tagColor:    '#fca5a5',
  },
  {
    id:          'chenda-melam',
    name:        'Chenda Melam',
    description: 'Traditional Kerala percussion ensemble',
    icon:        Drama,
    category:    'Cultural',
    tagBg:       'rgba(251,146,60,0.15)',
    tagColor:    '#fdba74',
  },
  {
    id:          'return-gifts',
    name:        'Return Gifts',
    description: 'Curated gift sets & personalized keepsakes',
    icon:        Gift,
    category:    'Gifts',
    tagBg:       'rgba(52,211,153,0.15)',
    tagColor:    '#6ee7b7',
  },
  {
    id:          'building-lights',
    name:        'Building Lights',
    description: 'Exterior facade & rooftop lighting installations',
    icon:        Lightbulb,
    category:    'Lighting',
    tagBg:       'rgba(234,179,8,0.15)',
    tagColor:    '#fde047',
  },
  {
    id:          'led-screenings',
    name:        'LED Screenings',
    description: 'Giant LED walls for live feeds & presentations',
    icon:        MonitorPlay,
    category:    'Tech',
    tagBg:       'rgba(59,130,246,0.15)',
    tagColor:    '#93c5fd',
  },
  {
    id:          'entry-specials',
    name:        'Entry Specials',
    description: 'Grand entrances: smoke machines, petal showers',
    icon:        Sparkles,
    category:    'Effects',
    tagBg:       'rgba(168,85,247,0.15)',
    tagColor:    '#d8b4fe',
  },
  {
    id:          'welcome-girls',
    name:        'Welcome Girls',
    description: 'Elegantly attired hostesses for guest reception',
    icon:        Users,
    category:    'Hosting',
    tagBg:       'rgba(236,72,153,0.15)',
    tagColor:    '#fbcfe8',
  },
  {
    id:          'decorative-tent',
    name:        'Decorative Tent',
    description: 'Premium canopy tents with interior draping',
    icon:        Tent,
    category:    'Venue',
    tagBg:       'rgba(6,182,212,0.15)',
    tagColor:    '#67e8f9',
  },
];