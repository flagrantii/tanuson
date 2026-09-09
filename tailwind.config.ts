/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  mode: "jit",
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "Instrument Serif", "Georgia", "serif"],
        body: ["var(--font-body)", "Newsreader", "Georgia", "serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "ui-monospace", "monospace"],
      },
      colors: {
        cream: "#f3efe6",
        paper: "#ffffff",
        ink: "#17150f",
        // Single source of truth is --rust in app/globals.css.
        rust: "var(--rust)",
        muted: "#6b665b",
        copy: "#3d3930",
      },
      borderColor: {
        hair: "rgba(0,0,0,.14)",
      },
      letterSpacing: {
        tightest: "-.04em",
        headline: "-.035em",
      },
      keyframes: {
        "draw-x": { from: { transform: "scaleX(0)" }, to: { transform: "scaleX(1)" } },
      },
    },
  },
  plugins: [],
};
