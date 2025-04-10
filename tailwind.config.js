/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./**/*.{js,jsx,ts,tsx}",
    "./index.html",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#3B82F6',
          dark: '#2563EB',
        },
        secondary: {
          light: '#F472B6',
          dark: '#DB2777',
        },
        background: {
          light: '#F9FAFB',
          dark: '#111827',
        },
        card: {
          light: '#FFFFFF',
          dark: '#1F2937',
        },
      },
      borderRadius: {
        'xl': '1rem',
      },
    },
  },
  plugins: [],
} 