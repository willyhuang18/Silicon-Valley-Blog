const User = require('./User');
const Coffee = require('./Coffee');
const Ingredient = require('./Ingredient');
const CoffeeIngredient = require('./CoffeeIngredient');



Coffee.belongsTo(User, { foreignKey: 'user_id' });

Coffee.belongsToMany(Ingredient, {through: CoffeeIngredient, foreignKey: 'coffee_id'}); 

Ingredient.belongsToMany(Coffee, {through: CoffeeIngredient, foreignKey: 'ingredient_id'});




module.exports = { User, Coffee, Ingredient, CoffeeIngredient};

