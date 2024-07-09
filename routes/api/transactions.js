const express = require('express');
const router = express.Router();
const transactionController = require('../../controllers/transactionController');

router.get('/list', transactionController.getAllTransactions);
router.get('/create', transactionController.createTransactionForm);
router.post('/create', transactionController.createTransaction);
// router.put('/', accountController.updateAccount);
//router.delete('/', accountController.deleteAccount);
//router.get('/getTransaction/:id', transactionController.getTransaction);

module.exports = router;
