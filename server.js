//import express
const express = require('express');
//import controller api files
const routes = require('./controllers');
//import connection file
const sequelize = require('./config/connection');
// connects session to sequelize Database
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(routes);

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});