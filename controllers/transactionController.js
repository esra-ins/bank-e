const Transaction = require('../models/transaction');
const Account = require('../models/account');

const getAllTransactions = async (req, res) => {
    const allTransactions = await Transaction.findAll();

    res.json(allTransactions);
}

const createTransactionForm = (req, res) => {
    res.render('createTransaction');
};

const createTransaction = async (req, res) => {
    const { accountId, transactionType, amount } = req.body;

    const isAccountIdExist = await Account.findOne({
        where: {
            id: accountId
        }
    });

    if (!isAccountIdExist) {
        return res.json({ 'message': `accountNo ${ accountId } is not exist!` });
    }

    console.log("balance: ", isAccountIdExist.balance);

    const newTransaction = await Transaction.create({
        accountId,
        transactionType,
        amount
    });

    console.log(isAccountIdExist.balance);

    if (transactionType == "deposit") {
        isAccountIdExist.balance += parseInt(amount);
    }

    if (transactionType == "withdraw") {
        //isAccountIdExist.balance -= parseInt(amount);
    }

    await isAccountIdExist.update(
        { balance: isAccountIdExist.balance }
    );

    console.log("updated balance: ", isAccountIdExist.balance);

    res.json({ 'message': ` transaction to  ${newTransaction.accountId} is success` });
};

module.exports = { getAllTransactions, createTransactionForm, createTransaction };
