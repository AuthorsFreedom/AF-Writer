/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        surface: {
          base: "var(--surface-base)",
          raised: "var(--surface-raised)",
          panel: "var(--surface-panel)",
        },
        border: {
          subtle: "var(--border-subtle)",
        },
        text: {
          primary: "var(--text-primary)",
          muted: "var(--text-muted)",
        },
        accent: {
          brand: "var(--accent-brand)",
        },
      },
    },
  },
  plugins: [],
};
