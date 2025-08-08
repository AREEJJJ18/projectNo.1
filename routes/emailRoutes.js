const express = require('express');
const sendWelcomeEmail = require('../controllers/email_controller')
const verifyEmail = require('../controllers/verifyEmail_controller');
const resendVerificationEmail = require('../controllers/resendVerificationEmail_controller');
const router = express.Router();

router.post('/send-email', sendWelcomeEmail);
router.get('/verify-email', verifyEmail);
router.post('/resend-verification-email', resendVerificationEmail);

module.exports = router;
