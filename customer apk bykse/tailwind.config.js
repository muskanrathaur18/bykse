/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#0F172A",
        brandYellow: "#FFC107",
        secondary: "#1E293B",
        bgLight: "#F8FAFC",
        borderLight: "#E2E8F0",
        textSecondary: "#64748B",
        textMuted: "#94A3B8",
      },
    },
  },
  plugins: [],
};
