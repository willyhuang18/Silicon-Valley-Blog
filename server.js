//import express
const express = require('express');
//import controller api files
const routes = require('./controllers');
//import connection file
const sequelize = require('./config/connection');
// connects session to sequelize Database
const session = require('express-session');
// helper function
const helpers = require('./utils/helpers');

// handlebars
const exphbs = require('express-handlebars');
const hbs = exphbs.create({helpers});

const app = express();
const PORT = process.env.PORT || 3001;

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: "super super secret",
  cookie: { originalMaxAge: 600000 },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// set Handlebars as the default template engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


app.use(routes);

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});