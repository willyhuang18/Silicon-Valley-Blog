//getting all model 
const { Post, User, Comment } = require('../models');
const router = require('express').Router();
const sequelize = require('../config/connection');

//render all post 
router.get('/', (req, res)=>{
    //checking 
    console.log(req.session);
    //find all
    Post.findAll({
        attributes: ['id', 'text', 'title', 'created_at'],
        include: [
            {
                model:Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include :{
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            },
        ]
    })
    .then(response => {
        //mapping the post object
        const userPost = response.map(post => post.get({plain: true}));
        //pass that into homepage
        res.render('homepage', {userPost, loggedIn: req.session.loggedIn})
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
})

//redirect to homepage after logged in
router.get('/login', (req, res) => {
    if(req.session.loggedIn) {
        res.redirect('/');
        return; 
    }
    res.render('login');
})
router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('signup');
  });
//getting post by id
router.get('/post/:id', (req, res) => {
    Post.findAll({
        where: {id: req.params.id},
        attributes: ['id', 'text', 'title', 'created_at'],
        include: [
            {
                model:Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include :{
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            },
        ]
    })
    .then(response =>{
        if(!response){
            res.status(404).json({ message: 'Please enter valid  id for this post'});
            return;
        }
        //serialize the data
        const singlePost = response.get({plain: true})
        //pass that into homepage
        res.render('the-post', {singlePost, loggedIn: req.session.loggedIn});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
})

module.exports=router;