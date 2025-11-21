/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                romantic: {
                    100: '#ffe4e6', // Rose 100
                    200: '#fecdd3', // Rose 200
                    300: '#fda4af', // Rose 300
                    500: '#f43f5e', // Rose 500
                    900: '#881337', // Rose 900
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                serif: ['Playfair Display', 'serif'],
            }
        },
    },
    plugins: [],
}
