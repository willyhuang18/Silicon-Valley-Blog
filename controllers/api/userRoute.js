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

//get route by id
router.get('/:id', (req,res) => {
    //using find one method for id
    User.findOne({
        attributes: {exclude: ['password']},
        where: {id: req.params.id}
    })
    .then(response =>{
            if(!response){
                res.status(404).json({ message: 'Please enter valid user id'});
                return;
            }
         res.json(response)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})