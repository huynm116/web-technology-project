const express = require('express');
const router = express.Router();
const {
    loginAccount, registerAccount, getAllAccounts, deleteAccount, getAccountByEmail
} = require('../controllers/AuthController');

router.route('/login').post(loginAccount);
router.route('/').get(getAllAccounts);
router.route('/register').post(registerAccount);
router.route('/:id').delete(deleteAccount).get(getAccountByEmail);
module.exports = router;