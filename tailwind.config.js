/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        tamlk: {
          teal: '#0D7C7C',
          'teal-mid': '#0F9A9A',
          'teal-dark': '#0A6464',
          'teal-light': '#E6F4F4',
          sand: '#E8DCC4',
          cream: '#FAF7F2',
          border: '#E5E0D8',
          muted: '#78716C',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        tamlk: '0 4px 24px -4px rgba(13, 124, 124, 0.12)',
        'tamlk-sm': '0 2px 12px -2px rgba(13, 124, 124, 0.08)',
      },
    },
  },
  plugins: [],
}
