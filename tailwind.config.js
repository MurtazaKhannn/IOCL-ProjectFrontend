/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        opensans: ['Open Sans', 'sans-serif'],
        danfo: ['Danfo', 'sans-serif'] ,
        bebas: ['"Bebas Neue"', 'cursive'],
        poiret: ['Poiret One', 'sans-serif'],
        teko: ['Teko', 'sans-serif']
      },
    },
    
  },
  plugins: [],
}

