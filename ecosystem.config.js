module.exports = {
  apps: [{
    name: 'calc.uralmetstroy.ru',
    script: 'node_modules/.bin/next',
    args: 'start',
    cwd: '/var/www/calc.uralmetstroy.ru',
    instances: 1,
    exec_mode: 'fork',
    env: { NODE_ENV: 'production', PORT: 3002 }
  }]
}
