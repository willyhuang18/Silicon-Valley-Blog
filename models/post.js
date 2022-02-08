//import the model from sequelize
const { Model, DataTypes } = require('sequelize');
//import connection file
const sequelize = require('../config/connection');

class Post extends Model{}

//define columns
Post.init (
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
          },
          title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              len:[1]
            }
          },
          text: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
              len:[1]
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'post'
    }
);

module.exports = Post;