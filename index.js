require('dotenv').config();
const express = require ('express');
const bodyParser = require ('body-parser');
const sequelize = require('./config/connection-db.js');
const Task = require('./models/task');
const User = require('./models/user');

User.hasMany(Task, { foreignKey: 'userId' });
Task.belongsTo(User, { foreignKey: 'userId' });

const taskRoutes = require('./routes/taskRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
const authRoutes = require('./routes/authRoutes.js');
const profilePicRoutes = require('./routes/profilePicRoutes.js');

const { Sequelize } = require('sequelize');


const port = process.env.PORT;
const app = express();


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

app.use('/api', profilePicRoutes);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/api', taskRoutes);

app.use('/api', userRoutes);

app.use('/api', authRoutes);






const startServer = async () => {
  try {
    await sequelize.authenticate(); 
    console.log('Database connected successfully');

    await sequelize.sync({ force: false}); 
    console.log('All models are synced');

    app.listen(port, () => {
      console.log(`Server is running on port:`,port);
    });

  } 
  catch (error) {
    console.error('Error:', error.message);
  }
  
};
startServer();