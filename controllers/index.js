const router = require('express').Router();

//getting all the api route
const route = require('./api');
const home = require('./homeRoute')

//use method 
router.use('/api', route);
router.use('/', home);

module.exports = router;