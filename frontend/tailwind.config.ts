import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        fadeInUp: 'fadeInUp 0.8s ease forwards',
        rotate: 'rotate 20s linear infinite',
        shine: 'shine 3s infinite',
      },
    },
  },
  plugins: [],
};
export default config;
