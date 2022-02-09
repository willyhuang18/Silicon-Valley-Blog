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