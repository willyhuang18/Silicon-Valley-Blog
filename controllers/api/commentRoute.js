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

//route for posting new comment
router.post('/', withAuth, (req, res) => {
    Comment.create({ 
        //data from model
        comment_text: req.body.comment_text, 
        post_id: req.body.post_id,
        user_id: req.session.user_id
    })
    .then(response => res.json(response))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

//delete comment by destroy it
router.delete('/:id', withAuth, (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id 
        }
    })
});