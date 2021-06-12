module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Nunito Sans', 'sans-serif']
      },
      colors: {
        light: {
          background: '#fafafa',
          text: '#111517',
          input: '#858585'
        },
        dark: {
          background: '#202c37',
          elements: '#2b3945'
        },
      }
    },

  },
  variants: {
    extend: {},
  },
  plugins: [],
}
