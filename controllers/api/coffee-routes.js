const router = require("express").Router();
const { User, Coffee, CoffeeIngredient, Ingredient} = require("../../models");
const withAuth = require("../../utils/auth");

// GET all coffee
router.get("/", async (req, res) => {
    try {
        const coffeeData = await Coffee.findAll({
            attributes: ["coffee_id", ],
            include: [
                {
                    model: User,
                    attributes: ["user_name"],
                },
                {
                    model: Ingredient,
                    attributes: ['ingredient_id', 'ingredient_name', 'ingredient_description'],
                },
            ],
        });
        res.status(200).json(coffeeData);
    } catch (err){
        res.status(500).json(err);
    }
});
//
// GET a single coffee
router.get("/:id", async (req, res) => {
    try {
        const coffeeData = await Coffee.findOne({
            attributes: ["coffee_id" ],
            include: [
                {
                    model: User,
                    attributes: ["user_name"],
                },
            ],
        });
        res.status(200).json(coffeeData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// CREATE a coffee
router.post("/", withAuth, async(req, res) => {
    try{
        // const userData = await User.findOne({
        //     where:{
        //         user_name: 1
        //     }
        // });
        const coffeeData = await Coffee.create({
            coffee_id: req.session.coffee_id,
            user_id: req.session.user_id, 
        });
        const ingredientData = await CoffeeIngredient.bulkCreate(
        [{
            coffee_id: req.session.coffee_id,
            ingredient_id: req.body.value1,
        },{
            coffee_id: req.session.coffee_id,
            ingredient_id : req.body.value2,
        },{
            coffee_id: req.session.coffee_id,
            ingredient_id : req.body.value3,
        }])
        console.log(req.session);
        res.status(200).json({userData, coffeeData, ingredientData });
    } catch (err) {
        res.status(400).json(err);
    }
});

// UPDATE a coffee
router.put("/:id", async(req, res) => {
    Coffee.update(req.body, {
        where: {
            coffee_id: req.params.id
        },
    }).then(postData => {
        if(!postData) {
            res.status(404).json({message: "No post found with this id!"});
            return;
        }
        res.status(200).json(postData);
    })
    .catch(err => {
        res.status(500).json(err);
    });
});

// DELETE a coffee
router.delete("/:id", async(req, res) =>{
    try {
        const coffeeData = await Coffee.destroy({
            where: {
                coffee_id: req.params.id
            }
        });
        if (!coffeeData) {
            res.status(404).json ({ message: "No coffee found with this id!"});
            return;
        }
        res.status(200).json(coffeeData);
    } catch (err){
        res.status(500).json(err);
    }
});

module.exports = router;






