/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/modules/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          black: '#000000',
          dark: '#111111',
          red: '#ff003c',
          pink: '#ff3366',
          bone: "#F7F5EF",
          accentRed: "#E10600",
          dark: "#0A0A0A"
        },
        borderRadius: {
          super: "2.5rem",
        }
      },
      animation: {
        'scan': 'scan 3s linear infinite',
        'pulse-glow': 'pulse-glow 2s infinite',
        'float': 'float 5s infinite linear',
        'logo-line': 'logo-line 2s infinite alternate',
      },
      keyframes: {
        scan: {
          '0%': { top: '0%' },
          '100%': { top: '100%' },
        },
        'pulse-glow': {
          '0%': {
            boxShadow: '0 0 0 0 rgba(255, 0, 60, 0.7)'
          },
          '70%': {
            boxShadow: '0 0 0 10px rgba(255, 0, 60, 0)'
          },
          '100%': {
            boxShadow: '0 0 0 0 rgba(255, 0, 60, 0)'
          },
        },
        float: {
          '0%': {
            transform: 'translateY(0) translateX(0)',
            opacity: '0'
          },
          '10%': {
            opacity: '1'
          },
          '90%': {
            opacity: '1'
          },
          '100%': {
            transform: 'translateY(-100vh) translateX(20px)',
            opacity: '0'
          },
        },
        'logo-line': {
          '0%': {
            transform: 'scaleX(0)'
          },
          '100%': {
            transform: 'scaleX(1)'
          },
        },
      },
    },
  },
  plugins: [],
}