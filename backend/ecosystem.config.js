module.exports = {
  apps: [{
    name: 'backend',
    script: './dist/app.js',
    env_production: {
      NODE_ENV: 'production',
    },
  }],

  deploy: {
    production: {
      user: 'user',
      host: '158.160.175.28',
      ref: 'origin/master',
      repo: 'https://github.com/Ivan-Pavlov2/nodejs-pm2-deploy.git',
      path: '/home/user/nodejs-pm2-deploy',
      'post-deploy': 'export NVM_DIR="$HOME/.nvm" && [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" && cd backend && npm i && npm run build && pm2 restart ecosystem.config.js --env production',
    },
  },
};
