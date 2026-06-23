/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        tiktok: '#FE2C55',
        google: '#1A73E8',
        card: '#F5F5F5',
        hint: '#FF6B00',
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '20px',
      },
      maxWidth: {
        phone: '430px',
      },
    },
  },
  plugins: [],
};
