const express = require('express');
const router = express.Router();
const authController = require('../../controllers/authController');

router.post('/register', authController.registerHandler);
router.post('/login', authController.loginHandler);
router.get('/refresh', authController.refreshTokenHandler);
router.post('/logout', authController.logoutHandler);

module.exports = router;
