/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      spacing: {
        '1440': '1024px',
      },
    },
  },
  daisyui: {
    themes: ["dark", "garden"],
  },
  plugins: [require("daisyui")],
}

