const Sequelize = require('sequelize');
const { dbSequelize } = require('../config/dbConn');

const Account = dbSequelize.define('account', {
    id: {
        type: Sequelize.INTEGER,

        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    pin: {
        type: Sequelize.INTEGER,
        //allowNull: false
    },
    balance: {
        type: Sequelize.FLOAT,
        //allowNull: false
    }
},
    { initialAutoIncrement: 1000000000 } //account id = unique account number
);

//User.hasMany(Account);

module.exports = Account;
