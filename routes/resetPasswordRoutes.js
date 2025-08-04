const express = require('express');
const router = express.Router();
const resetPassword = require('../controllers/resetPassword_controller');

router.post('/reset-password', resetPassword)

module.exports = router
