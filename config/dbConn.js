const Sequelize = require('sequelize');

const dbSequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,

    {
        dialect: process.env.DB_DIALECT,
        host: 'localhost'
    });

const isConnectedToDb = async () => {
    try {
        await dbSequelize.authenticate();
        console.log('................connected to db...............')
    } catch (error) {
        console.error('............NOT connected to db..............', error)
    }
};

module.exports = { dbSequelize, isConnectedToDb };
