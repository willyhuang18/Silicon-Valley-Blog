//import router express
const router = require('express').Router();
//getting comment model
const { Comment } = require('../../models');
//importing withAuth utils
const withAuth = require('../../utils/auth');

//Get route for all comment
router.get('/' ,(req, res) => {
    Comment.findAll({})
    .then(response => res.json(response))
    .catch(err => {
        console.log(err); 
        res.status(500).json(err); 
    })
})