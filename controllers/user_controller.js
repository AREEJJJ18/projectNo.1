const User = require('../models/user');
const getAllUsers =  async (req, res) => 
{
    try
    {
            const users = await User.findAll({
                attributes: {exclude :['password']}
            });
            res.json(users);
    }
    catch(error)
        {
            res.json({message:error.message})
        }
};

const getUserById = async (req, res) => 
{
    try
    {
    const Id = req.params.id;
    const user =await  User.findByPk(Id)
     if(user)
            {
             return   res.json(user);
            }
    else
            {
               return res.json({message:"user not found"});
            }
     }
        catch(error)
        {
            res.json({message:error.message});
        }
}
const createUser = async(req,res)=>
{
    try
    {
        const user = await User.create
        ({
              name: req.body.name,
              username: req.body.username,
              email: req.body.email,
              password:req.body.password
        })
    res.json({message:"user created sucessfully",user});
    }
    catch(error)
    {
    res.json({message:error.message});
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
                return res.json({message:"user not found"});
            }
            const updatedUser = await user.update(req.body);
              res.json({ message: "User updated successfully", updatedUser});
     }
    catch(error)
        {
            res.json({message:error.message});
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
        return res.json({ message: 'user not found' });
        }
      await user.update({ deleted_at: true })
          res.json({ message: 'User deleted successfully' });
     }
    catch(error) 
    {
      res.json({ message: error.message });
    }
}
module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
