module.exports = {
    purge: {
        content: [
            './src/**/*.html',
            './src/**/*.tsx',
        ],
    },
    theme: {},
    variants: {},
    plugins: [
        require('@tailwindcss/forms'),
    ]
}
