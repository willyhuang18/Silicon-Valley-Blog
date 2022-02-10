//import the model from sequelize
const { Model, DataTypes } = require('sequelize');
//import connection file
const sequelize = require('../config/connection');
//import bcrypt
const bcrypt = require('bcrypt');

class User extends Model{
    //to use bcrypt compare method to check password
    checkUserPassword(userPassword){
        return bcrypt.compare(userPassword, this.password);
    }
}

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
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate :{
                isEmail:true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                len:[6]
            }
        }
    },
    {
        hook:{
            //async beforeCreate, with async .. await method
            async beforeCreate(userData){
                userData.password = await  bcrypt.hash(userData.password, 10);
                return userData;
            },
            //async beforeUpdate, with async .. await method
            async beforeUpdate(updateUserData){
                updateUserData.password = await bcrypt.hash(updateUserData.password, 10)
                return updateUserData;
            }
        },
        sequelize,
        // freezeTableName:true,
        underscored: true,
        modelName:'user'
    }
);
 
module.exports = User;