module.exports = {
  apps: [{
    name: 'sentry-webhook',
    script: 'app.js',
    instances: 2,
    autorestart: true,
    watch: false,
    max_memory_restart: '100M',
    exec_mode: 'cluster',
    wait_ready: true, // wait for application process.send('ready');
    listen_timeout: 3000, // wait ready timeout
    kill_timeout: 5000, // send SIGKILL timeout
  }],
};
