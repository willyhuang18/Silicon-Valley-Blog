//import router express
const router = require('express').Router();
//import the other apis
const user = require('./userRoute');
const post = require('./postRoute');
const comment = require('./commentRoute');

//getting the route
router.use('/users', user);
router.use('/posts', post);
router.use('/comments', comment);

module.exports = router;