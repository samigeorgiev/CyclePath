module.exports = {
    apps: [
        {
            name: 'Cyclepath Backend',
            script: 'yarn',
            args: 'start:prod',
            watch: true,
            env: {
                PORT: 5000,
                NODE_ENV: 'production',
            },
        },
        {
            name: 'CyclePath frontend',
            script: 'serve',
            watch: true,
            env: {
                PM2_SERVE_PATH: './build',
                PM2_SERVE_PORT: 3000,
                PM2_SERVE_SPA: 'true',
                NODE_ENV: 'production',
            },
        },
    ],
}
