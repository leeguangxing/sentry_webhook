module.exports = {
  apps: [{
    name: 'sentry-webhook',
    script: 'app.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '100M',
    exec_mode: 'fork',
  }],
};
