/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        azulInstitucional: '#003b87',
        laranjaInstitucional: '#f97316', // opcional, tom do botão
      },
    },
  },
  plugins: [],
};
