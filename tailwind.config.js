/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        parchment: {
          DEFAULT: '#F0DEB0',
          dark: '#D8C48A',
          darker: '#C4A86B',
          edge: '#B89850',
        },
        ink: {
          DEFAULT: '#2C1810',
          light: '#5C3D28',
          muted: '#8B7050',
          faint: '#B8A080',
        },
        mapred: {
          DEFAULT: '#8B2020',
          light: '#A83030',
        },
        mapblue: {
          DEFAULT: '#2B5070',
          light: '#3B7098',
        },
        mapgreen: {
          DEFAULT: '#3B6030',
          light: '#5A8548',
        },
        gold: {
          DEFAULT: '#8B6914',
          bright: '#A88020',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Cinzel', 'serif'],
      },
    },
  },
  plugins: [],
}
