import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        surface: "var(--surface)",
        elevated: "var(--surface-elevated)",
        border: "var(--border)",
        primary: "var(--primary)",
        "primary-hover": "var(--primary-hover)",
        "primary-soft": "var(--primary-soft)",
        text: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          muted: "var(--text-muted)",
        },
        zin: {
          orange: {
            50: "#fff4ec",
            100: "#ffe5d3",
            200: "#ffc7a6",
            300: "#ffa176",
            400: "#ff7b3d",
            500: "#fd5512",
            600: "#e7460a",
            700: "#bd3408",
            800: "#962b0d",
            900: "#782710"
          },
          navy: {
            50: "#f3f6fa",
            100: "#e7ecf3",
            200: "#cbd5e1",
            300: "#9aa9bb",
            400: "#66788f",
            500: "#465a73",
            600: "#33465d",
            700: "#24364e",
            800: "#18263a",
            900: "#111c2d",
            950: "#0b1320"
          }
        }
      },
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        sans: ["Manrope", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      boxShadow: {
        soft: "0 16px 48px rgba(17, 28, 45, 0.10)",
      },
      borderRadius: {
        zin: "14px",
      },
    },
  },
  plugins: [],
};

export default config;

