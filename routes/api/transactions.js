const express = require('express');
const router = express.Router();
const transactionController = require('../../controllers/transactionController');
const verifyRole = require('../../middleware/verifyRole')

router.get('/list', verifyRole("admin"), transactionController.getAllTransactions);
router.get('/transfer', transactionController.createTransferForm);
router.post('/transfer', transactionController.createTransfer);

router.post('/balance/:id', transactionController.getBalanceAtTheTime); //  balance/:accountId
// only admin can add credit? deposit?
router.get('/create', verifyRole("admin"), transactionController.createTransactionForm);
router.post('/create', verifyRole("admin"), transactionController.createTransaction);
// router.put('/', accountController.updateAccount);
//router.delete('/', accountController.deleteAccount);
//router.get('/getTransaction/:id', transactionController.getTransaction);

module.exports = router;
