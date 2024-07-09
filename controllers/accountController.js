const Account = require('../models/account')
const generatePin = require('../utils/generator')

const getAllAccounts = async (req, res) => {
    const allAccounts = await Account.findAll();

    res.render('balanceList', { accounts: allAccounts })
};

const createAccount = async (req, res) => {
    const { userId, balance } = req.body;

    const pin = generatePin();

    const newAccount = await Account.create({
        userId,
        balance,
        pin
    });

    res.json({ 'message': `new account for user id: ${ newAccount.userId } is created` });
    //console.log('...new account...', newAccount);
};

const deleteAccount = async (req, res) => {
    const idReq = req.body.id;

    const account = await Account.findOne({
        where: {
            id: idReq
        }
    });

    if (!account) {
        return res.status(400).json({ 'message': `account id ${ idReq } not found` });
    };

    await Account.destroy({
        where: {
            id: idReq
        }
    });
    res.status(200).json({ 'message': `account id ${ idReq } is deleted` });
}

const getAccountByUserId = async (req, res) => {
    const accounts = await Account.findAll({
        where: {
            userId: req.params.id
        }
    });

    if (!accounts) {
        return res.status(400).json({ 'message': `user id ${ req.params.id } not found` });
    }
    //res.json(account);
    res.render('userBalance', { accounts: accounts })
}

module.exports = { getAllAccounts, createAccount, deleteAccount, getAccountByUserId };
