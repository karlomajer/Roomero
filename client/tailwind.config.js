const { colors } = require('tailwindcss/defaultTheme');

module.exports = {
  theme: {
    extend: {
      colors: {
        accent: colors.indigo,
        neutral: colors.gray,
        gray: {
          ...colors.gray,
          '900': '#26282c'
        }
      },
      maxWidth: {
        '250px': '250px'
      },
      width: {
        '250px': '250px'
      }
    }
  },
  variants: {
    borderWidth: ['responsive', 'first', 'hover', 'focus'],
    borderRadius: ['responsive', 'first', 'last', 'hover', 'focus'],
    margin: ['responsive', 'first', 'hover', 'focus']
  },
  plugins: []
};
