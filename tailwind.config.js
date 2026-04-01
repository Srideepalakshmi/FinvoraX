/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'finbglight': '#F8FAFC',
        'finbgdark': '#0F172A',
        'fincardlight': '#FFFFFF',
        'fincarddark': '#1E293B',
        'finprimary': '#2563EB',
        'finaccent': '#3B82F6',
        'finsuccess': '#16A34A',
        'finexpense': '#DC2626',
        'finmain': '#0F172A',
        'finsecondary': '#64748B',
        'finwhite': '#F8FAFC',
        'finborder': '#E2E8F0',
        'findivider': '#334155',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
