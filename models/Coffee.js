const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Coffee extends Model {}

Coffee.init(
    {
        coffee_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            reference: {
                model: 'user',
                key: 'user_id'
            },
        },

    },
    {
        sequelize,
        freezeTableName: true,
        modelName: 'coffee',
    }
);

module.exports = Coffee;
