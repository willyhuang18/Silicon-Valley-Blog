// Contain routes - the homepage and login page
const router = require('express').Router();
const { User, Coffee, Ingredient } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const coffeeData = await Coffee.findAll({
            attributes: ['coffee_id'],
            include: [
                {
                    model: User,
                    attributes: ['user_name'],
                },
                {
                    model: Ingredient,
                    attributes: ['ingredient_id', 'ingredient_name', 'ingredient_description'],
                },
            ],
        });
        // Serialize data for template
        const coffee = coffeeData.map((coffees) => coffees.get({ plain: true }));
        console.log(coffee);
        // Pass serialized data and session flag into template
        res.render('homepage', {
            coffee,
 //           logged_in: req.session.logged_in
        });
    } catch (err){
        res.status(500).json(err);
    }
});

// Render one coffee 
router.get('/coffee/:id', async (req, res) =>{
    try {
        const coffeeData = await Coffee.findByPk(req.params.id, { 
            include: [
                {
                    model: User,
                    attributes: ['user_name']
                },
                {
                    model: Ingredient,
                    attributes: ['ingredient_id', 'ingredient_name', 'ingredient_description'],
                    include: {
                        model: User,
                        attributes: ['user_name']
                    }
                },
            ],
        });
        const coffee = coffeeData.get({ plain: true});

        res.render('coffee', {
            ...coffee,
            logged_in: req.session.logged_in
        });
    } catch(err) {
        res.status(500).json(err);
    }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
    try{
        //Find the logged in user based on the session ID
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password']},
            include: [{ model: Coffee }],
        });
        const user = userData.get({ plain: true});

        res.render('profile', {
            ...user,
            logged_in: true
        });
    }catch (err){
                res.status(500).json(err);
    }
});

// If the user is already logged in, redirect the request to another route
router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/'); 
        return;
    }
    res.render('login');
});

// Render sign up 
router.get('/signup', (req, res) => {
    res.render('signup');
});

module.exports = router;





