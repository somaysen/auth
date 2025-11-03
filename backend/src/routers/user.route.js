const express = require('express');
const { userRegisterController,userLoginController,logoutController } = require('../controllers/user.controller');
const authmiddleware = require('../middlewares/auth.middleware');
const roleCheckMiddleware = require('../middlewares/role.check.middleware');
const { adminController } = require('../controllers/admin.Controller');

const router = express.Router();

router.post('/register', userRegisterController);
router.post('/login', userLoginController);
router.get('/logout', logoutController);

router.get('/get-user',authmiddleware,roleCheckMiddleware('admin'),adminController);

module.exports = router;