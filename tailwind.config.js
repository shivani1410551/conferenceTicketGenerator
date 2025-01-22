/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "Neutral0": "hsl(0, 0%, 100%)",
        "Neutral300": "hsl(252, 6%, 83%)",
        "Neutral400": "hsl(245, 15%, 58%,0.2)",
        "Neutral500": "hsl(245, 15%, 58%)",
        "Neutral600": "hsl(245, 15%, 58%,0.4)",
        "Neutral700": "hsl(245, 19%, 35%)",
        "Neutral900": "hsl(248, 70%, 10%)",

        "Orange500": "hsl(7, 88%, 67%)",
        "Orange700": "hsl(7, 71%, 60%)",

        "From": "hsl(7, 86%, 67%)",
        "To":"hsl(0, 0%, 100%)"

      },
      fontFamily: {
        font: [ "Inconsolata", "serif"],
      },
      fontWeight: {
        "normal": 400,
        "medium": 500,
        "bold": 700,
"xbold":800
      },
      screens: {
        sm:"430px"
      }
    },
    plugins: [],
  }
}

