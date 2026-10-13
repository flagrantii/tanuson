/** A colour from the CSS palette, with Tailwind's opacity modifier support. */
const token = (name: string) => `rgb(from var(--${name}) r g b / <alpha-value>)`

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
      // The palette lives in app/globals.css (:root); these only point at it, so
      // one edit there re-tints every class. `rgb(from …)` keeps opacity
      // modifiers such as bg-ink/90 and text-cream/70 working on a variable.
      colors: {
        cream: token("cream"),
        paper: "#ffffff",
        ink: token("ink"),
        accent: token("accent"),
        muted: token("muted"),
        copy: token("copy"),
      },
      borderColor: {
        hair: "var(--hair)",
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
