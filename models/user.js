
const { DataTypes,Model } = require('sequelize');
const sequelize = require('../config/connection-db');
class User extends Model{}
  User.init({
    id:{
      type: DataTypes.INTEGER,
      autoIncrement:true,
      primaryKey: true
    },
    name:{
      type: DataTypes.STRING,
      allowNull: false
    },
    username: 
    {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
      
    },
    email:
    {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password:{
      type: DataTypes.STRING,
      allowNull: false
    },
    deleted_at:
    {
        type:DataTypes.DATE,
        defaultValue: null
    }
  },
  {
       sequelize,
        modelName: 'User',       
        tableName: 'users', 
       timestamps: false,
       defaultScope: 
       {
         attributes: { exclude: ['password','deleted_at'] }
       }
  },
);
module.exports = User






