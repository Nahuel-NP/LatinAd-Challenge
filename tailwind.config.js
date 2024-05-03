/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["poppins", "sans-serif"],
      },
      colors: {
        'dodger-blue': {
          '50': '#edfaff',
          '100': '#d7f1ff',
          '200': '#b9e8ff',
          '300': '#88ddff',
          '400': '#50c7ff',
          '500': '#28a9ff',
          '600': '#1890ff',
          '700': '#0a73eb',
          '800': '#0f5cbe',
          '900': '#135095',
          '950': '#11315a',
      },
      },
      gridTemplateRows:{
        wrapper:"auto 1fr auto"
      }
    },
  },
  plugins: [],
};
