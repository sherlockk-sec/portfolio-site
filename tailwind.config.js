/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blueprint: {
          bg: '#0a192f', // Deep blue background
          grid: '#1e3a8a', // Faint grid lines
          text: '#64ffda', // Tech cyan/green text
          border: '#3b82f6', // Blueprint lines
        }
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'grid-pattern': "linear-gradient(to right, #1e3a8a 1px, transparent 1px), linear-gradient(to bottom, #1e3a8a 1px, transparent 1px)",
      }
    },
  },
  plugins: [],
}
