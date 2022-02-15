//getting all model 
const { User, Coffee, Ingredient } = require('../models');
const router = require('express').Router();
const sequelize = require('../config/connection');
const withAuth = require('../utils/auth');
const res = require('express/lib/response');

router.get('/', async (req, res) => {
    try{
        const coffeeData = await Coffee.findAll({
            attributes: ['coffee_id'],
            include: [
                {
                    model: Ingredient,
                    attributes: ['ingredient_id', "ingredient_name", "ingredient_description"],
                },
                {
                    model: User,
                    attributes: ["user_name"]
                },
            ],
        });
        const coffee = coffeeData.map((coffee) => coffee.get({plain: true}));
        res.render("dashboard", { coffee, logged_in: true});
    } catch (err){
        res.status(500).json(err);
    }
});
//display Coffee in the dashboard
router.get('/', withAuth, (req, res)=>{
    //checking 
    console.log(req.session);
    //find all
    Coffee.findAll({
        where:{
            //using ID to indicate
            user_id: req.session.user_id
        },
        attributes: ['coffee_id'],
        include: [
            {
                model: Ingredient,
                attributes: ['ingredient_id', 'ingredient_name', 'ingredient_description'],
            },
            {
                model: User,
                attributes: ['user_name']
            },
        ]
    })
    .then(response => {
        //serialize data
        const coffee = response.map((coffee) => coffee.get({plain: true}));
        //pass that into homepage
        res.render('dashboard', { coffee, logged_in: true})
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
})

//render edit page
router.get('/edit/:id', withAuth, (req, res) => {
    Coffee.findOne({
        where: {coffee_id: req.params.coffee_id},
        attributes: ['coffee_id'],
        include: [
            {
                model: Ingredient,
                attributes: ['ingredient_id', 'ingredient_name', 'ingredient_description'],
            },
            {
                model: User,
                attributes: ['user_name']
            },
        ]
    })
    .then(response => {
        const coffee = response.get({plain: true});
        //pass that into homepage
        res.render('edit-posts', {coffee, logged_in: true})
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
})

// rendering newPost page 
router.get('/new-coffee', withAuth, (req, res) => {
    Ingredient.findAll({
        // where: { user_id: req.session.user_id},
        // attributes: ['coffee_id'],
        // include: [
        //     {
        //         model: Ingredient,
        //         attributes: ['ingredient_id', 'ingredient_name', 'ingredient_description'],
        //     },
        //     {
        //         model: User,
        //         attributes: ['user_name']
        //     },
        // ]
    })
    .then(response => {
        const ingredients = response.map(ingredient => ingredient.get({plain: true}));
        console.log(ingredients);
        //pass that into homepage
        res.render('new-coffee', {ingredients, logged_in: true})
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  module.exports = router;
  