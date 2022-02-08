//import the model from sequelize
const { Model, DataTypes } = require('sequelize');
//import connection file
const sequelize = require('../config/connection');

class User extends Model{}

//define columns
User.init(
    {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        username:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        email: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            validate :{
                isEmail:true
            }
        },
        password: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate:{
                len:[6]
            }
        }
    },
    {
        sequelize,
        freezeTableName:true,
        underscored: true,
        modelName:'user'
    }
);
 
module.exports = User;