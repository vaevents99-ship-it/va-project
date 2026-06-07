/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy:     '#0B2A5B',
        navyDark: '#071A3E',
        gold:     '#d4af37',
        goldLight:'#f4d97a',
        goldPale: '#fff3c4',
        goldDeep: '#b8962e',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body:    ['"DM Sans"', 'sans-serif'],
      },
      animation: {
        'float':  'float  6s ease-in-out infinite',
        'float2': 'float2 7s ease-in-out infinite 1s',
        'float3': 'float  8s ease-in-out infinite 2s',
        'float4': 'float2 5s ease-in-out infinite 3s',
        'sparkle':  'sparkle 2.5s ease-in-out infinite',
        'sparkle2': 'sparkle 2.5s ease-in-out infinite 0.8s',
        'sparkle3': 'sparkle 2.5s ease-in-out infinite 1.6s',
        'pulse-gold': 'pulseGold 2.2s ease-in-out infinite',
        'shimmer': 'shimmer 3.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%':     { transform: 'translateY(-20px) rotate(4deg)' },
        },
        float2: {
          '0%,100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%':     { transform: 'translateY(-14px) rotate(-4deg)' },
        },
        sparkle: {
          '0%,100%': { opacity: '0', transform: 'scale(0) rotate(0deg)' },
          '50%':     { opacity: '1', transform: 'scale(1) rotate(180deg)' },
        },
        pulseGold: {
          '0%,100%': { boxShadow: '0 0 0 0 rgba(212,175,55,0.45)' },
          '50%':     { boxShadow: '0 0 0 16px rgba(212,175,55,0)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition:  '200% 0' },
        },
      },
      backdropBlur: { xs: '2px' },
    },
  },
  plugins: [],
}
