module.exports = {
  mode: 'jit',
  purge: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['Nunito Sans', 'sans-serif'],
      },
      colors: {
        light: {
          background: '#fafafa',
          text: '#111517',
          input: '#858585',
        },
        dark: {
          background: '#202c37',
          elements: '#2b3945',
        },
      },
      maxWidth: {
        12: '12rem',
      },
    },
  },
  variants: {},
  plugins: [],
}
