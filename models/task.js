const { DataTypes,Model } = require('sequelize');
const sequelize = require('../config/connection-db');
const TASK_STATUS = require('../constants/taskStatus');
class Task extends Model{}

  Task.init({
    
    id:
     {
      type: DataTypes.INTEGER,
      autoIncrement:true,
      primaryKey: true
    },
    task_Name: 
    {
      type: DataTypes.STRING,
      
    },
    task_status:
    {
        type: DataTypes.INTEGER,
        defaultValue: TASK_STATUS.INCOMPLETE,
        allowNull: false
    },
    deadline:
    {
        type: DataTypes.DATE
    },
    userId:
    {
        type: DataTypes.INTEGER,
        allowNull: false 
    }
    

  },
  {
       sequelize,
       modelName: 'Task',
       tableName:'tasks',
       timestamps: true,
       paranoid:true,
       defaultScope: 
       {
         attributes: { exclude: ['deletedAt'] }
       }
  }
);
module.exports = Task