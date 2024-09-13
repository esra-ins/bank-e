const User = require('./user');
const Account = require('./account');
const Transaction = require('./transaction');

const { dbSequelize } = require('../config/dbConn');

const Role = require('./role');
const UserRole = require('./userRole');

//* start */
//const Transfer = require('./transfer')
//* end */

User.hasMany(Account);
//Account.belongsTo(User);
Account.hasMany(Transaction);

Role.belongsToMany(User, { through: UserRole });
User.belongsToMany(Role, { through: UserRole });

//dbSequelize.sync({ force: true })

dbSequelize.sync()
    .then(
        console.log('...........synchronized successfully............')
    )
    .catch((err) => {
        console.log(err);
    })
