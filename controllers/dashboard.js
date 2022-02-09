//getting all model 
const { Post, User, Comment } = require('../models');
const router = require('express').Router();
const sequelize = require('../config/connection');
const withAuth = require('../utils/auth');

//display post in the dashboard
router.get('/', withAuth, (req, res)=>{
    //checking 
    console.log(req.session);
    //find all
    Post.findAll({
        where:{
            //using ID to indicate
            user_id:req.session.user_id
        },
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

})
