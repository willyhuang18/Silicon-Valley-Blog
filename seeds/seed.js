const sequelize = require('../config/connection');
const {User, Coffee, Ingredient, CoffeeIngredient} = require('../models');

const userData = require('./user-seeds.json');
const coffeeData = require('./coffee-seeds.json');
const ingredientData = require('./ingredient-seeds.json');
const coffeeIngredientData = require('./coffee-ingredient-seeds.json');


const seedDatabase = async () => {
    await sequelize.sync({ force: true});

    await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    await Coffee.bulkCreate(coffeeData, {
        individualHooks: true,
        returning: true,
    });

    await Ingredient.bulkCreate(ingredientData, {
        individualHooks: true,
        returning: true,
    });

    await CoffeeIngredient.bulkCreate(coffeeIngredientData, {
        individualHooks: true,
        returning: true,
    });
}

seedDatabase();