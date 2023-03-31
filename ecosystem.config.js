module.exports = {
  apps: [{
    name: 'webhook-server',
    script: 'app.js',
    instances: 2,
    autorestart: true,
    watch: true,
    max_memory_restart: '200M',
    exec_mode: 'cluster',
    wait_ready: false,
    listen_timeout: 3000,
    kill_timeout: 5000,
  }],
};
