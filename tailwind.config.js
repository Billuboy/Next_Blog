/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */
module.exports = {
  mode: 'jit',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      gray: {
        100: '#eeeeee',
        200: '#e5e5e5',
        300: '#dddddd',
      },
      purple: {
        500: '#9B5DE5',
      },
      red: {
        danger: '#FF0000',
      },
      white: {
        basic: '#ffffff',
      },
      black: '#000000',
    },
    fontFamily: {
      sans: ['Montserrat', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
