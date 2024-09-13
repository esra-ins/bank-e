const express = require('express');
const router = express.Router();
const accountController = require('../../controllers/accountController');
const verifyRole = require('../../middleware/verifyRole')

router.get('/list', verifyRole("admin"), accountController.getAllAccounts);
//router.get('/create', accountController.createAccountForm);
router.post('/create', accountController.createAccount);
// router.put('/', accountController.updateAccount);
//router.delete('/', accountController.deleteAccount);
router.get('/getAccount/:id', accountController.getAccountByUserId);

module.exports = router;
