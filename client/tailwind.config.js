const { colors } = require('tailwindcss/defaultTheme');

module.exports = {
  theme: {
    extend: {
      colors: {
        accent: { ...colors.indigo, 500: '#6d75ff' },
        secondary: {
          100: '#2a3059',
          200: '#1a2029',
          300: '#151a22',
        },
        gray: {
          50: '#fcfcfc',
          ...colors.gray,
          900: '#26282c',
        },
      },
      maxWidth: {
        '250px': '250px',
      },
      width: {
        '250px': '250px',
      },
      margin: {
        30: '7.5rem',
      },
      padding: {
        7: '1.75rem',
      },
    },
  },
  variants: {
    borderWidth: ['responsive', 'first', 'hover', 'focus'],
    borderRadius: ['responsive', 'first', 'last', 'hover', 'focus'],
    margin: ['responsive', 'first', 'hover', 'focus'],
  },
  plugins: [],
};
