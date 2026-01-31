module.exports = {
  apps: [
    {
      name: 'cyber-backend',
      cwd: __dirname,
      script: 'dist/src/main.js',
      instances: 1,
      exec_mode: 'fork',
      watch: false,
      autorestart: true,
      min_uptime: '20s',
      max_restarts: 100,
      max_memory_restart: '500M',
      restart_delay: 5000,
      exp_backoff_restart_delay: 1000,
      out_file: 'logs/cyber-backend.out.log',
      error_file: 'logs/cyber-backend.err.log',
      env: {
        NODE_ENV: 'production',
        PORT: process.env.PORT || 3000,
        HOST: process.env.HOST || '0.0.0.0',
      },
    },
  ],
};