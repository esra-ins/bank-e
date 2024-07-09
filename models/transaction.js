const Sequelize = require('sequelize');
const { dbSequelize } = require('../config/dbConn');

const Transaction = dbSequelize.define('transaction', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    accountId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'accounts',
            key: 'id'
        }
    },
    amount: {
        type: Sequelize.FLOAT,

    },
    transactionType: {
        type: Sequelize.STRING,
        allowNull: false
    }
    /*  currency: {
         type: Sequelize.STRING,
     }, */
    /*  transactionDate: {
         type: Sequelize.DATE
     } */
});

module.exports = Transaction;
