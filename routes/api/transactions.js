const express = require('express');
const router = express.Router();
const transactionController = require('../../controllers/transactionController');

router.get('/list', transactionController.getAllTransactions);
router.get('/create', transactionController.createTransactionForm);
router.post('/create', transactionController.createTransaction);
//* start */
router.get('/transfer', transactionController.createTransferForm);
router.post('/transfer', transactionController.createTransfer);

router.post('/balance/:id', transactionController.getBalanceAtTheTime); //  balance/:accountId
//* end */
// router.put('/', accountController.updateAccount);
//router.delete('/', accountController.deleteAccount);
//router.get('/getTransaction/:id', transactionController.getTransaction);

module.exports = router;
