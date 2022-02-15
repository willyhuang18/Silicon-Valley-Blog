const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Ingredient extends Model {}

Ingredient.init( 
    {
        ingredient_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        ingredient_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ingredient_description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        modelName: 'ingredient'
    }
);

module.exports = Ingredient;