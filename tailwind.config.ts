import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "var(--color-primary)",
          primaryLight: "var(--color-primary-light)",
          primaryDark: "var(--color-primary-dark)",
          secondary: "var(--color-secondary)",
          secondaryLight: "var(--color-secondary-light)",
          accent: "var(--color-accent)",
          bg: "var(--color-bg)",
          bgSecondary: "var(--color-bg-secondary)",
          surface: "var(--color-surface)",
          surfaceHover: "var(--color-surface-hover)",
          text: "var(--color-text)",
          textSecondary: "var(--color-text-secondary)",
          textTertiary: "var(--color-text-tertiary)",
          border: "var(--color-border)",
          borderHover: "var(--color-border-hover)",
          success: "var(--color-success)",
          error: "var(--color-error)",
          warning: "var(--color-warning)",
        },
      },
      boxShadow: {
        glow: "0 20px 70px -20px rgba(29, 97, 231, 0.45)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.5", transform: "scale(1)" },
          "50%": { opacity: "0.9", transform: "scale(1.06)" },
        },
      },
      animation: {
        float: "float 8s ease-in-out infinite",
        pulseGlow: "pulseGlow 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
