const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');

const verifyRole = require('../../middleware/verifyRole')

router.get('/create', userController.createUserForm);
router.post('/create', userController.createUser);
router.get('/list', verifyRole("admin"), userController.getAllUsers);
router.put('/', userController.updateUser);
router.delete('/', userController.deleteUser);
router.get('/getUser/:id', userController.getUser);

module.exports = router;
