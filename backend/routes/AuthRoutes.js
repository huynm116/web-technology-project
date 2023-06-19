const express = require('express');
const router = express.Router();
const {
    loginAccount, registerAccount, getAllAccounts
} = require('../controllers/AuthController');

router.route('/login').post(loginAccount);
router.route('/').get(getAllAccounts);
router.route('/register').post(registerAccount);

module.exports = router;