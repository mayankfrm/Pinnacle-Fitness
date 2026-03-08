/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#06110b',
        'bg-secondary': '#0a1a10',
        'bg-card': '#0f2416',
        'bg-card-hover': '#14301d',
        'text-primary': '#e2f8e8',
        'text-secondary': '#8bba9b',
        'text-muted': '#5c856a',
        'neon-green': '#39ff14',
        'electric-cyan': '#00ffff',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-primary": "linear-gradient(135deg, #39ff14, #00ffff)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
