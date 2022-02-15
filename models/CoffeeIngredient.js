const { Model, DataTypes} = require('sequelize');

const sequelize = require('../config/connection');

class CoffeeIngredient extends Model {}

CoffeeIngredient.init(
    {
        coffee_ingredient_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        coffee_id: {
            type: DataTypes.INTEGER,
            reference: {
                model: 'coffee',
                key: 'coffee_id'
            },
        },
        ingredient_id: {
            type: DataTypes.INTEGER,
            reference: {
                model: 'ingredient',
                key: 'ingredient_id',
            },
        },
        
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'coffee_ingredient',
    }
);

module.exports = CoffeeIngredient;