
const { DataTypes,Model } = require('sequelize');
const sequelize = require('../config/connection-db');
const USER_STATUS = require('../constants/userStatus');

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
    user_status:
    {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: USER_STATUS.ACTIVE
    }

  },
  {
       sequelize,
        modelName: 'User',       
        tableName: 'users', 
       timestamps: true,
       paranoid: true,
       defaultScope: 
       {
         attributes: { exclude: ['password','deletedAt'] }
       }
  }
);
module.exports = User






