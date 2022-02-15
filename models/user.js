const {Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {
    checkPassword(loginPw) {
        return bcrypt.compare(loginPw, this.user_password);
    }
}

User.init( 
    {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        user_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_email: {
            type: DataTypes.STRING,
            allowNull: false,
            unqiue: true,
            validate: {
                isEmail: true,
            }
        },
        user_password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8],
            },
        },
    },
    {
        hooks: {
            beforeCreate: async (signUpUserData) => {
                signUpUserData.user_password = await bcrypt.hash(signUpUserData.user_password, 10);
                return signUpUserData;
            },
            beforeUpdate: async (updatedUserData) => {
                updatedUserData.user_password = await bcrypt.hash(updatedUserData.user_password, 10);
                return updatedUserData;
            },
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        modelName: 'user',
    }
);

module.exports = User;