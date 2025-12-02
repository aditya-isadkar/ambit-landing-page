import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "#f30402",
          50: "#fee2e2",
          100: "#fecaca",
          200: "#fca5a5",
          300: "#f87171",
          400: "#ef4444",
          500: "#f30402",
          600: "#dc0302",
          700: "#b91c1c",
          800: "#991b1b",
          900: "#7f1d1d",
        },
        secondary: {
          orange: "#f68c28",
          burgundy: "#853047",
          gray: "#4b5563",
        },
      },
      fontFamily: {
        sans: ["var(--font-jost)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;

