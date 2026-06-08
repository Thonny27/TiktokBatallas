/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'ping-slow': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
        'pulse-fast': 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-up': 'floatUp 1s ease-out forwards',
        'gift-banner': 'slideBanner 3s ease-in-out forwards',
        'giant-rise': 'giantRise 4s cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
        'slide-up': 'slideUp 0.3s ease-out forwards',
      },
      keyframes: {
        floatUp: {
          '0%': { transform: 'translateY(0) scale(1)', opacity: '1' },
          '100%': { transform: 'translateY(-100vh) scale(1.5)', opacity: '0' },
        },
        slideBanner: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '10%': { transform: 'translateX(0)', opacity: '1' },
          '90%': { transform: 'translateX(0)', opacity: '1' },
          '100%': { transform: 'translateX(-100%)', opacity: '0' },
        },
        giantRise: {
          '0%': { transform: 'translateY(100vh) scale(0.5)', opacity: '0' },
          '20%': { transform: 'translateY(0) scale(1.2)', opacity: '1', filter: 'drop-shadow(0 0 50px rgba(255,255,255,0.8))' },
          '80%': { transform: 'translateY(-10vh) scale(1.5)', opacity: '1', filter: 'drop-shadow(0 0 100px rgba(255,255,255,1))' },
          '100%': { transform: 'translateY(-50vh) scale(2)', opacity: '0' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}
