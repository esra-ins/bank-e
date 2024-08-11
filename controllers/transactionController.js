//* start */
const { Op } = require('sequelize');
//* end */
const Transaction = require('../models/transaction');
const Account = require('../models/account');

const getAllTransactions = async (req, res) => {
    const allTransactions = await Transaction.findAll();

    res.json(allTransactions);
}

//* start */
const createTransferForm = (req, res) => {

    res.render('createTransfer');
};

const createTransfer = async (req, res) => {
    const { from_accountId, to_accountId, amount, description } = req.body;

    console.log(description);

    const isFromAccountIdExist = await Account.findOne({
        where: {
            id: from_accountId
        }
    });

    const isToAccountIdExist = await Account.findOne({
        where: {
            id: to_accountId
        }
    });

    if (!(isFromAccountIdExist || isToAccountIdExist)) {
        return res.json({ 'message': 'accountNo is not exist!' });
    }

    console.log("initial balances: ", isFromAccountIdExist.balance, isToAccountIdExist.balance);

    //const fromAccountTransaction =
    await Transaction.create({
        accountId: from_accountId,
        transactionType: "withdraw",
        amount: amount
    });

    // const toAccountTransaction =
    await Transaction.create({
        accountId: to_accountId,
        transactionType: "deposit",
        amount: amount
    });

    isFromAccountIdExist.balance -= parseInt(amount);
    isToAccountIdExist.balance += parseInt(amount);

    await isFromAccountIdExist.update(
        { balance: isFromAccountIdExist.balance }
    );
    await isToAccountIdExist.update(
        { balance: isToAccountIdExist.balance }
    );

    console.log("updated balances: ", isFromAccountIdExist.balance, isToAccountIdExist.balance);

    res.json({ 'message': ` transfer to  ${to_accountId} is success` });
};
//* end */

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
        isAccountIdExist.balance -= parseInt(amount);
    }

    await isAccountIdExist.update(
        { balance: isAccountIdExist.balance }
    );

    console.log("updated balance: ", isAccountIdExist.balance);

    res.json({ 'message': ` transaction to  ${newTransaction.accountId} is success` });
};

//* start */
const getBalanceAtTheTime = async (req, res) => {
    const { createdAt } = req.body;

    const startedDate = new Date(createdAt);
    const endDate = new Date(); // or Date.now() UTC;

    const isAccountIdExist = await Account.findOne({
        where: {
            id: req.params.id
        }
    })

    if (!isAccountIdExist) {
        return res.json({ 'message': `accountNo ${req.params.id} is not exist!` });
    }

    const currentBalance = isAccountIdExist.balance;

    //sum of withdraw between given time and now
    const sumOfWithdraw = await Transaction.sum("amount", {
        where: {
            [Op.and]:
                [
                    { accountId: req.params.id },
                    {
                        createdAt: {
                            [Op.between]: [startedDate, endDate]
                        }
                    },

                ],
            transactionType: "withdraw"
        }
    });

    //sum of deposit between given time and now
    const sumOfDeposit = await Transaction.sum("amount", {
        where: {
            [Op.and]:
                [
                    { accountId: req.params.id },
                    {
                        createdAt: {
                            [Op.between]: [startedDate, endDate]
                        }
                    },

                ],
            transactionType: "deposit"
        }
    });

    //console.log(`sum of withdraw BETWEEN ${startedDate} and ${endDate} ...`, sumOfWithdraw);
    //console.log(`sum of deposit BETWEEN ${startedDate}  and ${endDate} ...`, sumOfDeposit);

    const balanceAtTheTime = currentBalance + sumOfWithdraw - sumOfDeposit

    console.log(`.............BALANCE at ${startedDate} WAS ...`, balanceAtTheTime)
    console.log(`.....CURRENT BALANCE at ${endDate}  IS ...`, currentBalance)

    return res.json({
        'message': `BALANCE at ${startedDate} was ${balanceAtTheTime} and CURRENT BALANCE at ${endDate} is ${currentBalance} `
    });
};

module.exports = { getBalanceAtTheTime, createTransferForm, createTransfer, getAllTransactions, createTransactionForm, createTransaction };
//* end */