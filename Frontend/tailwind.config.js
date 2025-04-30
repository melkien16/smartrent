/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#E6F7F6',
          100: '#CCEFED',
          200: '#99DFDA',
          300: '#66CFC7',
          400: '#33BFB4',
          500: '#0C9488', // Primary teal
          600: '#0A7A70',
          700: '#075F58',
          800: '#054540',
          900: '#022A28',
        },
        secondary: {
          50: '#E6ECF5',
          100: '#CCD9EC',
          200: '#99B3D9',
          300: '#668DC6',
          400: '#3366B3',
          500: '#1E40AF', // Secondary navy
          600: '#18348E',
          700: '#12276D',
          800: '#0C1A4C',
          900: '#060D2B',
        },
        accent: {
          50: '#FEF4E6',
          100: '#FDE9CD',
          200: '#FBD39A',
          300: '#F9BD68',
          400: '#F7A735',
          500: '#F59E0B', // Accent orange
          600: '#C47F09',
          700: '#935F07',
          800: '#624004',
          900: '#312002',
        },
        success: {
          500: '#10B981', // Green
        },
        warning: {
          500: '#F59E0B', // Yellow/Orange
        },
        error: {
          500: '#EF4444', // Red
        },
      },
      boxShadow: {
        'card': '0 2px 8px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 4px 12px rgba(0, 0, 0, 0.12)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-light': 'pulseLight 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseLight: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
    },
  },
  plugins: [],
};