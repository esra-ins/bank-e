//* start */
/*
const Sequelize = require('sequelize');
const { dbSequelize } = require('../config/dbConn');

const Transfer = dbSequelize.define('transfer', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    from_accountId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'accounts',
            key: 'id'
        }
    },
    to_accountId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        // possibility of sending money to another bank's account???
        //references: {
         //   model: 'accounts',
         //   key: 'id'
        // }

    },
    amount: {
        type: Sequelize.FLOAT

    },
    description: {
        type:Sequelize.STRING
    }
});

module.exports = Transfer;
*/

//* end */