//import the model from sequelize
const { Model, DataTypes } = require('sequelize');
//import connection file
const sequelize = require('../config/connection');

class Comment extends Model{}

Comment.init (
    {
       id:{
           type: DataTypes.INTEGER,
           primaryKey: true,
           allowNull: false,
           autoIncrement: true
       },
       comment_text: {
           type:DataTypes.STRING,
           allowNull:false
       } 
    },
    {
        sequelize,
        freezeTableName:true,
        underscored: true,
        modelName:'comment'
    }
);

module.exports = Comment;