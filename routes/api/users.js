const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');

router.get('/list', userController.getAllUsers);
router.get('/create', userController.createUserForm);
router.post('/create', userController.createUser);
router.put('/', userController.updateUser);
//router.delete('/', userController.deleteUser);
router.get('/getUser/:id', userController.getUser);

module.exports = router;
