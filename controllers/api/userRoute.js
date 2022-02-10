//import router express
const router = require('express').Router();
//getting User Post Comment model
const { User, Post, Comment } = require('../../models');
//importing withAuth utils
const withAuth = require('../../utils/auth');

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
        where: {id: req.params.id},
        //including comment and post that belong this user
        include:[
            {
                model: Post,
                attributes: ['id', 'title', 'text', 'created_at']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text','created_at'],
                include: {
                  model: Post,
                  attributes: ['title']
                }
            }
        ]
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

//post route by create new user'
router.post('/', (req,res)=>{
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    //using session to save user data
    .then(response => {
        req.session.save(() => {
            req.session.user_id = response.id;
            req.session.username = response.username;
            req.session.loggedIn = true;

            res.json(response);
        })
    });
});

//getting post route for login
router.post('/login', (req, res)=>{
    User.findOne({
        where:{
            email:req.body.email
        }
    })
    .then(response =>{
        if(!response){
            res.status(404).json({ message: 'Please enter valid user Email'});
            return;
        }
        //verify user 
        const valid = response.checkUserPassword(req.body.password);
        if(!valid) {
            res.status(400).json({message: 'Please Enter password again.'})
            return;
        }
           //using session to save user data
        req.session.save(() => {
            req.session.user_id = response.id;
            req.session.username = response.username;
            req.session.loggedIn = true;

            res.json({user: response, message: 'You had logged in!' });
        })
    })
})

//need the log out route too
router.post('/logout', withAuth, (req, res) =>{
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            //ending the request
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
})

// put route for update user
router.put('/:id', withAuth, (req,res)=>{
    User.update(req.body, {
        where: {
            id: req.params.id
        }
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

//delete route for user
router.delete('/:id',withAuth, (req, res) =>{
    User.destroy({
        where: {
            id: req.params.id
        }
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

module.exports = router;