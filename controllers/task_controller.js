const { Op } = require("sequelize");
const Task = require('../models/task');
const User = require('../models/user');
const TASK_STATUS = require('../constants/task_status');

const getAllTasks =  async (req, res) => 
{
    try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const search = req.query.search || '';
    const status = req.query.status?.toLowerCase();

     let whereCondition = {
      task_Name: { [Op.like]: `%${search}%` }
    };

    if (status !== undefined) 
      {
    if (status === 'incomplete')
      {
         whereCondition.task_status = TASK_STATUS.INCOMPLETE;
      } 
    else if (status === 'pending') 
      {
         whereCondition.task_status = TASK_STATUS.PENDING;
      } 
    else if (status === 'complete') 
      {
         whereCondition.task_status = TASK_STATUS.COMPLETE;
      }
      }


    const { count, rows } = await Task.findAndCountAll({
      where:whereCondition,
      include:
             {
                 model:User,
                 attributes:['id', 'name', 'username', 'email']
             },
      limit:limit,
      offset:offset
    });

    const totalPages = Math.ceil(count / limit);
    const nextPage = page < totalPages ? page + 1 : null;
    const previousPage = page > 1 ? page - 1 : null;

    return res.json({
      data: rows,
      meta:
      {
        totalTasks:count,
        page,
        nextPage,
        previousPage,
        totalPages
      }
    });
  } catch (error) {
    return res.json({ message: error.message });
  }
};
const getTaskById = async (req, res) => 
{
    try
    {
    const Id = req.params.id;
    const task =await  Task.findByPk(Id)
     if(task)
            {
             return   res.json(task);
            }
    else
            {
               return res.json({message:"task not found"});
            }
     }
        catch(error)
        {
            res.json({message:error.message});
        }
}
const createTask = async(req,res)=>
{
    try
    {
        const task = await Task.create
        ({
        task_Name: req.body.task_Name,
        task_status: req.body.task_status?? TASK_STATUS.INCOMPLETE,
        deadline:new Date(new Date().setDate(new Date().getDate() + 3)),
        userId: req.body.userId
        })
    res.json({message:"task created sucessfully",task});
    }
    catch(error)
    {
    res.json({message:error.message});
    }
}

const updateTask = async (req, res) => 
{
    try
    {
        const Id = req.params.id;
        const task =await Task.findByPk(Id);
            if(!task)
            {
                return res.json({message:"task not found"});
            }
            const updatedTask = await task.update(req.body);
              res.json({ message: "Task updated successfully", updatedTask});
     }
    catch(error)
        {
            res.json({message:error.message});
        }
}

const deleteTask = async(req, res) =>
{
    try
    {
         const id = req.params.id;
         const task = await Task.findByPk(id)
      if (!task)
        {
        return res.json({ message: 'Task not found' });
        }
      await task.update({ is_deleted: true })
          res.json({ message: 'Task deleted successfully' });
     }
    catch(error) 
    {
      res.json({ message: error.message });
    }
}
module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};