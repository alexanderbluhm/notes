const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  purge: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        gray: colors.gray,
        brand: {
          DEFAULT: colors.indigo[500],
          red: colors.red[500]
        },
        rose: colors.rose,
      },
      typography: {
        DEFAULT: {
          css: {
            color: colors.gray[300],
            blockquote: {
              color: colors.gray[100],
              borderLeftColor: colors.gray[800],
            },
            h1: {
              color: colors.gray[100],
              fontWeight: '500'
            },
            h2: {
              color: colors.gray[100],
              fontWeight: '500'
            },
            h3: {
              color: colors.gray[100],
              fontWeight: '500'
            },
            h4: {
              color: colors.gray[100],
              fontWeight: '500'
            },
            strong: {
              color: colors.gray[300]
            },
            pre: {
              backgroundColor: colors.gray[900],
            },
            thead: {
              color: colors.gray[100],
              borderBottomColor: colors.gray[600]
            },
            'tbody tr': {
              borderBottomColor: colors.gray[800]
            },
            a: {
              color: colors.indigo[500]
            },
            hr: {
              borderColor: colors.gray[800]
            },
            code: {
                color: colors.gray[100],
            }
          },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};
