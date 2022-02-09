//import router express
const router = require('express').Router();
//getting User Post Comment model
const { User, Post, Comment } = require('../../models');
//importing withAuth utils
const withAuth = require('../../utils/auth');

//Get route for all post
router.get('/', (req,res) =>{
    Post.findAll({
        //query configuration
        attributes: ['id', 'text', 'title', 'created_at'],
        //first element is the column / function to order by, the second is the direction.
        order: [['created_at', 'DESC']],

        //include comment and user
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
    .then(response => res.json(response))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})