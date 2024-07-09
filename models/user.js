const Sequelize = require('sequelize');
const { dbSequelize } = require('../config/dbConn');
const bcrypt = require('bcryptjs');

const User = dbSequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: {
            args: true,
            msg: 'this username is already in use!'
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        lowercase: true,
        unique: {
            args: true,
            msg: 'this email address already in use!'
        },
        validate: {
            isEmail: {
                args: true,
                msg: 'not an email address format!'
            }
        }
    }
});

User.beforeCreate(async (user) => {
    const realPassword = user.password;
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;

    console.log('...hashed password....', hashedPassword);
    console.log('...real password....', realPassword);
});
// Load hash from your password DB.

module.exports = User;