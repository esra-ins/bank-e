const express = require('express');
const router = express.Router();
const accountController = require('../../controllers/accountController');

router.get('/list', accountController.getAllAccounts);
//router.get('/create', accountController.createAccountForm);
router.post('/create', accountController.createAccount);
// router.put('/', accountController.updateAccount);
//router.delete('/', accountController.deleteAccount);
router.get('/getAccount/:id', accountController.getAccountByUserId);

module.exports = router;
