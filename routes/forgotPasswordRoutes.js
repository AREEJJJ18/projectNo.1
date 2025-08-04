const express = require('express');
const router = express.Router();
const forgotPassword = require('../controllers/forgotPassword_controller');

router.post("/forgot-password", forgotPassword);

module.exports = router;

