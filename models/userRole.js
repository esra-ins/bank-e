const Sequelize = require('sequelize');
const { dbSequelize } = require('../config/dbConn');

const UserRole = dbSequelize.define('userRole', {
    userId: {
        type: Sequelize.INTEGER,
        // allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    roleId: {
        type: Sequelize.INTEGER,
        defaultValue: 1, //default value is 1 = default role is user
        references: {
            model: 'roles',
            key: 'id'
        }
    }
});

module.exports = UserRole;