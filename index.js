require('dotenv').config();
const express = require ('express');
const bodyParser = require ('body-parser');
const sequelize = require('./config/connection-db.js');
const Task = require('./models/task');
const User = require('./models/user');
const taskRoutes = require('./routes/taskRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
const authRoutes = require('./routes/authRoutes.js');



const port = process.env.PORT;
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



app.use('/api', taskRoutes);

app.use('/api', userRoutes);

app.use('/api', authRoutes);





const startServer = async () => {
  try {
    await sequelize.authenticate(); 
    console.log('Database connected successfully');

    await Task.sync({ force: false}); 
    console.log('Task model synced');

     await User.sync({ force: false});
    console.log('User model synced');

    app.listen(port, () => {
      console.log(`Server is running on port:`,port);
    });

  } 
  catch (error) {
    console.error('Error:', error.message);
  }
  
};
startServer();