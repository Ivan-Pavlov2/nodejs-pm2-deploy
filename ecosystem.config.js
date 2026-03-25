require('dotenv').config({ path: './.env.deploy' });

const {
  DEPLOY_USER,
  DEPLOY_HOST,
  DEPLOY_PATH,
  DEPLOY_REPO,
  DEPLOY_REF = 'origin/master',
  DEPLOY_SSH_KEY,
} = process.env;

module.exports = {
  apps: [
    {
      name: 'backend',
      script: './dist/app.js',
      cwd: './backend',
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000,
        DB_ADDRESS: 'mongodb://localhost:27017/mestodb',
        JWT_SECRET: '7f3e2a1b8c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f',
      },
    },
  ],

  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: DEPLOY_REPO,
      path: DEPLOY_PATH,
      ssh_options: `StrictHostKeyChecking=no -i ${DEPLOY_SSH_KEY}`,
      'pre-deploy-local': `scp -i ${DEPLOY_SSH_KEY} backend/.env ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}/backend/.env`,
      'post-deploy': `
        export NVM_DIR="$HOME/.nvm"
        [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
        cd backend && npm install && npm run build
        cd ../frontend && npm install && npm run build
        pm2 reload ecosystem.config.js --env production
      `,
    },
  },
};
