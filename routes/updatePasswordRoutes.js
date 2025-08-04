const express = require('express');
const updatePassword = require('../controllers/updatePassword_controller');
const { verifyToken } = require('../Utilities/jwtService');
const router = express.Router();

router.put('/update-password', verifyToken, updatePassword);

module.exports = router;
