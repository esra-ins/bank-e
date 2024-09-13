const Sequelize = require('sequelize');
const { dbSequelize } = require('../config/dbConn');

const Role = dbSequelize.define('role', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        unique: true
        //allowNull: true,
    }
});

Role.bulkCreate(
    [{ name: 'user' }, { name: 'admin' }],
    {
        fields: ['name'],
        ignoreDuplicates: true
    }
); 

module.exports = Role;
