const express = require('express');
const sendWelcomeEmail = require('../controllers/email_controller')
const router = express.Router();

router.post('/send-email', sendWelcomeEmail);

module.exports = router;
