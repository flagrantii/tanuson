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
      fontSize: {
        // The text floor. Mono folio marks, meta rows, chips and small links all
        // sit here: nothing on the site is set under 15px. They stay quiet through a
        // light weight rather than a smaller size, and track a hair tight so meta
        // rows that fitted at 11px still fit on one line.
        label: ["15px", { lineHeight: "1.45", letterSpacing: "-.01em", fontWeight: "300" }],
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
