/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: '#F8FAFC',
          pure: '#FFFFFF',
        },
        slateBorder: '#E2E8F0',
        textDark: '#0F172A',
        textMuted: '#64748B',
        brandNavy: '#0F1F38',
        brandMaroon: '#6B1719',
        brandTeal: {
          DEFAULT: '#0A7E8C',
          hover: '#086975',
          light: '#E6F6F8',
        },
        statusGreen: {
          DEFAULT: '#059669',
          light: '#ECFDF5',
          border: '#A7F3D0',
        },
        statusAmber: {
          DEFAULT: '#D97706',
          light: '#FFFBEB',
          border: '#FDE68A',
        },
        statusIndigo: {
          DEFAULT: '#4F46E5',
          light: '#EEF2FF',
          border: '#C7D2FE',
        },
        statusRed: {
          DEFAULT: '#DC2626',
          light: '#FEF2F2',
          border: '#FECACA',
        },
      },
      borderRadius: {
        'card': '12px',
        'element': '8px',
      },
      minHeight: {
        'touch': '44px',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
