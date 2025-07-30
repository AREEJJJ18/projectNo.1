const express = require('express');
const router = express.Router();
const { uploadProfilePicture, updateProfilePicture, deleteProfilePicture } = require('../controllers/profilePic_controller');
const { verifyToken }  = require('../Utilities/jwtService');
const upload = require('../middlewares/uploadProfilePic');


router.post('/uploadProfilePicture', verifyToken, upload.single('profilePic'), uploadProfilePicture);
router.patch('/users/:id/uploadProfilePicture', verifyToken, upload.single('profilePic'), updateProfilePicture);
router.delete('/users/:id/uploadProfilePicture', verifyToken, deleteProfilePicture);






module.exports = router;