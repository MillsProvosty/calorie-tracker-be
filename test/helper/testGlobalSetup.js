var shell = require('shelljs');

module.exports = () => {
  shell.exec('npx sequelize db:drop --env test');
  shell.exec('npx sequelize db:create --env test');
  shell.exec('npx sequelize db:migrate --env test');
}
