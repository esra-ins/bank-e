const User = require('./user')
const Account = require('./account')
const Transaction = require('./transaction')

const { dbSequelize } = require('../config/dbConn')

User.hasMany(Account);
//Account.belongsTo(User);
Account.hasMany(Transaction);

/* Project.hasMany(Task, { foreignKey: 'tasks_pk' });
Task.belongsTo(Project, { foreignKey: 'tasks_pk' }); */

//dbSequelize.sync({ force: true })

dbSequelize.sync()
    .then(
        console.log('...........synchronized successfully............')
    )
    .catch((err) => {
        console.log(err);
    })
