/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'bg-hero': "url('/src/assets/herobg.png')",
      },
    },
  },
  plugins: [],
};
