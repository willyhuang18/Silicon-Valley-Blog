//import router express
const router = require('express').Router();
//getting User model
const { User } = require('../../models');

//Get all user
router.get('/', (req, res)=>{
    //using findAll() method 
    User.findAll({
        attributes: {exclude: ['password']}
    })
    .then(response => res.json(response))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})