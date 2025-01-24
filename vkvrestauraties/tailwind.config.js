/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                'sans': ['Lexend', 'sans-serif']
            },
            keyframes: {
                fadeIn: {
                    '0%': {opacity: '0'},
                    '100%': {opacity: '1'},
                },
                fadeOut: {
                    '0%': {opacity: '1'},
                    '100%': {opacity: '0'},
                },
                slideIn: {
                    '0%': {transform: 'translateX(-100%)'},
                    '100%': {transform: 'translateX(0)'},
                },
                slideOut: {
                    '0%': {transform: 'translateX(0)'},
                    '100%': {transform: 'translateX(-100%)'},
                }
            },
        },
        animation: {
            'fade-in': 'fadeIn 1s ease-in',
            'fade-out': 'fadeOut 1s ease-out',
            'slide-in': 'slideIn .2s ease-in',
            'slide-out': 'slideOut .2s ease-out',
        },
    },
    plugins: [],
}

