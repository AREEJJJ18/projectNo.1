const express = require('express');
const router = express.Router();
const userMiddleware = require('../middlewares/logging');
const  verifyToken  = require('../middlewares/verifyToken');

const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/user_controller');



router.get('/users', userMiddleware, verifyToken, getAllUsers);
router.get('/users/:id', userMiddleware, verifyToken, getUserById);
router.post('/users', userMiddleware, verifyToken, createUser);
router.patch('/users/:id', userMiddleware, verifyToken, updateUser);
router.delete('/users/:id', userMiddleware, verifyToken, deleteUser);

module.exports = router
