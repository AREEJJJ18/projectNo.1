const { DataTypes,Model } = require('sequelize');
const sequelize = require('../config/connection-db');
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
        type: DataTypes.INTEGER
    },
    created_at:
    {
        type: DataTypes.DATEONLY
    },
    deadline:
    {
        type: DataTypes.DATEONLY
    },
    is_deleted:
    {
        type:DataTypes.BOOLEAN,
        defaultValue: false
    }
    

  },
  {
       sequelize,
       modelName: 'Task',
       tableName:'tasks',
       timestamps: false,
       defaultScope: 
       {
         attributes: { exclude: ['is_deleted'] }
       }
  },
);
module.exports = Task