module.exports = {
  apps: [{
    name: 'frontend',
    script: 'npm',
    args: 'run start',
  }],

  deploy: {
    production: {
      user: 'user',
      host: '158.160.175.28',
      ref: 'origin/master',
      repo: 'https://github.com/Ivan-Pavlov2/nodejs-pm2-deploy.git',
      path: '/home/user/nodejs-pm2-deploy/frontend',
      'post-deploy': 'export NVM_DIR="$HOME/.nvm" && [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" && cd frontend && npm i && npm run build && cp -r build/* /home/user/nodejs-pm2-deploy/frontend'
    },
  },
};
