/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#a5b4fc",

          secondary: "#00cf00",

          accent: "#ff2200",

          neutral: "#231c05",

          "base-100": "#242439",

          info: "#00849a",

          success: "#23ff7d",

          warning: "#c17900",

          error: "#f80027",
        },
      },
    ],
  },
  plugins: [daisyui],
};
