const User = require('./user')
const { dbSequelize } = require('../config/dbConn')

dbSequelize.sync()
    .then(
        console.log('...........synchronized successfully............')
    )
    .catch((err) => {
        console.log(err);
    }) 