const Task = require('../models/task');
const getAllTasks =  async (req, res) => 
{
    try
    {
            const tasks = await Task.findAll()
            res.json(tasks);
    }
    catch(error)
        {
            res.json({message:error.message})
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
        task_status: Math.floor(Math.random() * 3),
        created_at: req.body.created_at,
        deadline:new Date(new Date(req.body.created_at).setDate(new Date(req.body.created_at).getDate() + 3))
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