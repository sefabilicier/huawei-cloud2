/** @type {import('tailwindcss').Config} */


export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    //"node_modules/@material-tailwind/html/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        title: ["Inter", "serif"],
      },
      animation: {
        'gradient-flow': 'gradient-flow 10s ease-in-out infinite',
      },
      backgroundSize: {
        '200%': '200%',
      },

    },
    plugins: [],

  }
}