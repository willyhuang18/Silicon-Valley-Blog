const router = require('express').Router();

//getting all the api route
const route = require('./api');
const home = require('./homeRoute')
const dashboard = require('./dashboard');


//use method 
router.use('/api', route);
router.use('/', home);
router.use('/dashboard', dashboard);

router.use((req, res) => {
    res.status(404).end();
  });

module.exports = router;