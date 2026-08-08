/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#0b132b',
          blue: '#1c2541',
          darkBlue: '#1e3a8a',
          primary: '#2563eb',
          teal: '#0d9488',
          green: '#10b981',
          lightBlue: '#f0f9ff',
          lightTeal: '#f0fdfa',
          lightGreen: '#f0fdf4',
          gray: '#f8fafc',
          textDark: '#1e293b',
          textLight: '#64748b'
        }
      },
      fontFamily: {
        sans: ['Inter', 'Poppins', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
