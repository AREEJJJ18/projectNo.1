const express = require('express');
const router = express.Router();
const userMiddleware = require('../middleware/logging');

const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/user_controller');



router.get('/users', userMiddleware, getAllUsers);
router.get('/users/:id', userMiddleware, getUserById);
router.post('/users', userMiddleware, createUser);
router.patch('/users/:id', userMiddleware, updateUser);
router.delete('/users/:id', userMiddleware, deleteUser);

module.exports = router
