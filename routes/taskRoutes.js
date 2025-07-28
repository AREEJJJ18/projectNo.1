const express = require('express');
const router = express.Router();
const { verifyToken }  = require('../jwtService');
const { authorizeAdminOrUser } = require('../middlewares/roleBasedAccess');
const {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
} = require('../controllers/task_controller'); 

router.get('/tasks', verifyToken, authorizeAdminOrUser, getAllTasks);
router.get('/tasks/:id', verifyToken, getTaskById);
router.post('/tasks', verifyToken, createTask);
router.patch('/tasks/:id', verifyToken, updateTask);
router.delete('/tasks/:id', verifyToken, deleteTask);

module.exports = router;
