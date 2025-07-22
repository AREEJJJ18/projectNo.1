const express = require ('express');
const bodyParser = require ('body-parser');
const sequelize = require('./connection-db');
const Task = require('./models/task');
const User = require('./models/user');
const { body } = require('express-validator');


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

const port = 7000;
const app = express();
app.use(bodyParser.json())

app.use(function (req, res, next)
{
    
    const timestamp = new Date().toISOString();
    console.log("intercepted request:",req.method, req.url, timestamp);
    console.log("this is middleware 2")
    next();
});
app.use(function (req, res, next)
{
    
    console.log("this is middleware 3");
    next();
});

app.use(function (req, res, next)
{
    
    console.log("this is middleware 4");
    next();
});


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

app.post('/signup',[
    body('name')
      .trim()
      .notEmpty().withMessage('Name is required')
      .isString().withMessage('Name must be a string'),

    body('username')
      .trim()
      .notEmpty().withMessage('Username is required')
      .isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),

    body('email')
      .trim()
      .notEmpty().withMessage('Email is required')
      .isEmail().withMessage('Must be a valid email'),

    body('password')
      .notEmpty().withMessage('Password is required')
      .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
      ],SignUpUser);

app.post('/login',[
          body('email')
         .trim()
         .notEmpty().withMessage('Email is required')
         .isEmail().withMessage('Must be a valid email'),

         body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
        ], LoginUser);


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