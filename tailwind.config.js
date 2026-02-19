/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'aegis-primary': '#00f3ff', // Cyan
                'aegis-secondary': '#ff0055', // Neon Pink
                'aegis-dark': '#0a0a12', // Deep Space
                'aegis-bg': '#050510',
                'aegis-accent': '#2e2e48',
            },
            fontFamily: {
                'orbitron': ['Orbitron', 'sans-serif'],
                'rajdhani': ['Rajdhani', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
