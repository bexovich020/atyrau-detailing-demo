import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#07080A",
        surface: "#0D0F12",
        raised: "#15181D",
        fg: "#ECEDEF",
        muted: "#A1A5AB",
        accent: "#D9C5A0",
        line: "rgba(236, 237, 239, 0.09)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Arial Narrow", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        site: "1440px",
      },
      borderRadius: {
        DEFAULT: "2px",
        sm: "1px",
        md: "2px",
        lg: "3px",
        xl: "4px",
        "2xl": "4px",
        "3xl": "4px",
        full: "9999px",
      },
      transitionTimingFunction: {
        expo: "cubic-bezier(0.16, 1, 0.3, 1)",
        "in-out-expo": "cubic-bezier(0.76, 0, 0.24, 1)",
      },
      keyframes: {
        marquee: {
          from: { transform: "translate3d(0,0,0)" },
          to: { transform: "translate3d(-50%,0,0)" },
        },
        grain: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "20%": { transform: "translate(-4%, 3%)" },
          "40%": { transform: "translate(3%, -2%)" },
          "60%": { transform: "translate(-2%, -4%)" },
          "80%": { transform: "translate(4%, 2%)" },
        },
        "scroll-cue": {
          "0%": { transform: "translateY(-100%)" },
          "60%, 100%": { transform: "translateY(260%)" },
        },
        "light-drift": {
          "0%, 100%": { transform: "translate3d(-6%, 0, 0)", opacity: "0.55" },
          "50%": { transform: "translate3d(6%, 2%, 0)", opacity: "0.85" },
        },
      },
      animation: {
        marquee: "marquee 38s linear infinite",
        grain: "grain 1.2s steps(5) infinite",
        "scroll-cue": "scroll-cue 2.2s cubic-bezier(0.76,0,0.24,1) infinite",
        "light-drift": "light-drift 14s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
