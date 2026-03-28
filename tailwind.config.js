/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark': '#0a0a0a',
        'dark-secondary': '#1a1a1a',
        'dark-tertiary': '#2a2a2a',
      },
      backdropFilter: {
        'none': 'none',
        'blur': 'blur(10px)',
      },
      boxShadow: {
        'glow': '0 0 30px rgba(99, 102, 241, 0.3)',
        'glow-cyan': '0 0 30px rgba(34, 211, 238, 0.2)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in',
        'slide-up': 'slideUp 0.6s ease-out',
        'glow': 'glow 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { 
            opacity: '0',
            transform: 'translateY(20px)'
          },
          '100%': { 
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
        glow: {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(99, 102, 241, 0.5), inset 0 0 20px rgba(99, 102, 241, 0.1)'
          },
          '50%': { 
            boxShadow: '0 0 30px rgba(99, 102, 241, 0.8), inset 0 0 20px rgba(99, 102, 241, 0.2)'
          },
        }
      }
    },
  },
  plugins: [],
}
