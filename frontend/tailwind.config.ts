import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        "main-shadow": "0 2px 5px 2px rgba(142, 148, 157, 0.15)",
      },
      fontFamily: {
        varela: ["VarelaRegular", "sans-serif"],
        noto: ['font-noto', 'NotoSans'],
      },
      colors: {
        "main-gray-light": "#E6E9EB",
        "main-gray-semi": "#969FC0",
        "main-gray": "#465274",

        "main-lima": "#76CE8E",
        "main-dodge": "#4B90B7",
        "main-blue": "#3C5CBA",
        "main-cyan": "#03A7C0",
        "main-aqua": "#A9DCDF",
        "main-green": "#4BB7A0",
        "main-purple": "#8A3CBA",
        "main-lila": "#9276CE",
      },
      backgroundImage: {
        "main-gradient": "linear-gradient(90deg, #4A48B8 0%, #03A7C0 100%)",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
