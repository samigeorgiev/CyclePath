module.exports = {
    apps: [
        {
            name: 'cyclepath-backend',
            script: './backend/dist/main.js',
            watch: true,
            env: {
                PORT: 5000,
                NODE_ENV: 'production',
            },
        },
        {
            name: 'cyclepath-frontend',
            script: 'serve',
            watch: true,
            env: {
                PM2_SERVE_PATH: './client/build',
                PM2_SERVE_PORT: 3000,
                PM2_SERVE_SPA: 'true',
                NODE_ENV: 'production',
            },
        },
    ],
}
