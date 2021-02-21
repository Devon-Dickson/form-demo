module.exports = {
    mount: {
        dist: "/",
        src: "/"
    },
    devOptions: {
        port: 8000,
    },
    plugins: ["@snowpack/plugin-postcss", '@snowpack/plugin-react-refresh']
}