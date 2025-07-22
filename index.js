const express = require ('express');
const bodyParser = require ('body-parser');
const sequelize = require('./connection-db');
const Task = require('./models/task');
const User = require('./models/user');

const {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
} = require('./controllers/task_controller'); 


const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require('./controllers/user_controller');


const {
  SignUpUser,
  LoginUser
} = require('./controllers/auth');

const port = 8000;
const app = express();
app.use(bodyParser.json())


app.get('/tasks', getAllTasks);
app.get('/tasks/:id', getTaskById);
app.post('/tasks', createTask);
app.patch('/tasks/:id', updateTask);
app.delete('/tasks/:id', deleteTask);

app.get('/users', getAllUsers);
app.get('/users/:id', getUserById);
app.post('/users', createUser);
app.patch('/users/:id', updateUser);
app.delete('/users/:id', deleteUser);

app.post('/signup',SignUpUser);
app.post('/login',LoginUser);


const startServer = async () => {
  try {
    await sequelize.authenticate(); 
    console.log('Database connected successfully');

    await Task.sync({ force: false}); 
    console.log('Task model synced');

     await User.sync({ force: false});
    console.log('User model synced');

    app.listen(port, () => {
      console.log(` Server is running on port:`,port);
    });

  } 
  catch (error) {
    console.error(' Error:', error.message);
  }
  
};
startServer();