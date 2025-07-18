const { Sequelize} = require('sequelize');
const sequelize = new Sequelize('task_db', 'root', 'ROOT', {
  host: 'localhost',
  port: 3306,
  logging: false,
  dialect: 'mysql'
});

module.exports = sequelize;