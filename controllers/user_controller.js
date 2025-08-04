const bcrypt = require('bcrypt');
const { Op } = require("sequelize");
const User = require('../models/user');
const Task = require('../models/task');
const USER_STATUS = require('../constants/user_status');
const errorResponse = require('../Utilities/errorResponseHandling');


const getAllUsers =  async (req, res) => 
{
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const search = req.query.search || '';
    const status = req.query.status?.toLowerCase();
    let whereCondition = 
    {
        username: { [Op.like]: `%${search}%` }
    }
    
    if (status !== undefined) 
      {
    if (status === 'inactive')
      {
         whereCondition.user_status = USER_STATUS.INACTIVE;
      } 
    else if (status === 'active') 
      {
         whereCondition.user_status = USER_STATUS.ACTIVE;
      } 
      }
    const { count, rows } = await User.findAndCountAll({
       where: whereCondition,
       include: 
       {
               model: Task,
               attributes: ['id', 'task_Name', 'task_status', 'createdAt', 'deadline']
      },
               limit:limit,
               offset:offset
    });

    const totalPages = Math.ceil(count / limit);
    const nextPage = page < totalPages ? page + 1 : null;
    const previousPage = page > 1 ? page - 1 : null;

    return res.status(200).json({
      data: rows,
      meta:
      {
      totalUsers:count,
      page,
      nextPage,
      previousPage,
      totalPages
      }
    });
  } catch (error)
      {
            return errorResponse(res, 500, 'An unexpected error occurred while fetching users');
      }
}

const getUserById = async (req, res) => 
{
    try
    {
    const Id = req.params.id;
    const user =await  User.findByPk(Id)
     if(user)
            {
             return   res.status(200).json(user);
            }
    else
            {
               return errorResponse(res, 404, 'User not Found');
            }
     }
        catch(error)
        {
            return errorResponse(res, 500, 'An unexpected error occurred while fetching user');
        }
}
const createUser = async(req,res)=>
{
    try
    {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = await User.create
        ({
              name: req.body.name,
              username: req.body.username,
              email: req.body.email,
              password:hashedPassword,
              user_status:req.body.user_status?? USER_STATUS.INACTIVE,
              role: req.body.role
        })
    res.status(201).json({message:"user created sucessfully",user});
    }
    catch(error)
    {
          return errorResponse(res, 500, 'An unexpected error occurred while creating user'); 
    }
}

const updateUser = async (req, res) => 
{
    try
    {
        const Id = req.params.id;
        const user =await User.findByPk(Id);
            if(!user)
            {
                return errorResponse(res, 404, 'User not Found');
            }
            const updatedUser = await user.update(req.body);
              res.status(200).json({ message: "User updated successfully", updatedUser});
     }
    catch(error)
        {
            return errorResponse(res, 500, 'An unexpected error occurred while updating user'); 
        }
}

const deleteUser = async(req, res) =>
{
    try
    {
         const id = req.params.id;
         const user = await User.findByPk(id)
      if (!user)
        {
           return errorResponse(res, 404, 'User not Found');
        }
      await user.destroy()
          res.status(200).json({ message: 'User deleted successfully' });
     }
    catch(error) 
    {
         return errorResponse(res, 500, 'An unexpected error occurred while deleting user'); 
    }
}
   

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
