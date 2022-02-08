// import the Sequelize
const Sequelize = require('sequelize');

//import the dotenv
require('dotenv').config();

//adding condition for deploying
const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASSWORD, {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306
    });

module.exports = sequelize;