
const { DataTypes,Model } = require('sequelize');
const sequelize = require('../config/connection-db');
const USER_STATUS = require('../constants/user_status');

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
    },
    role: 
    {
      type: DataTypes.ENUM('user', 'admin'),
      allowNull: false,
      defaultValue: 'user'
    },
    profile_picture: 
    {
      type: DataTypes.STRING,
      allowNull: true,
    },
    reset_password_hash: 
    {
      type: DataTypes.STRING,
      allowNull: true
    },
    isVerified:
    {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    email_verification_hash:
    {
      type: DataTypes.STRING,
      allowNull: true
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






