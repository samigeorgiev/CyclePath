module.exports = {
    name: 'CyclePath frontend',
    script: 'serve',
    watch: true,
    env: {
        PM2_SERVE_PATH: './build',
        PM2_SERVE_PORT: 5000,
		PM2_SERVE_SPA: 'true',
        NODE_ENV: 'production'
    }
}
