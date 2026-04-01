/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-lexend)', 'sans-serif'],
        display: ['var(--font-lexend)', 'sans-serif'],
      },
      colors: {
        brand: {
          primary: '#053980',
          primaryStrong: '#032a5f',
          accent: '#ff7415',
          accentStrong: '#e5670d',
        },
        azulInstitucional: '#053980',
        laranjaInstitucional: '#ff7415',
      },
      borderRadius: {
        xl2: '1rem',
        xl3: '1.25rem',
      },
      boxShadow: {
        soft: '0 10px 30px rgba(15, 23, 42, 0.08)',
        lift: '0 16px 34px rgba(15, 23, 42, 0.14)',
      },
    },
  },
  plugins: [],
};
