const User = require('../models/user');
const getAllUsers =  async (req, res) => 
{
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 3;
    const offset = (page - 1) * limit;

    const { count, rows } = await User.findAndCountAll({
      limit:limit,
      offset:offset
    });

    const totalPages = Math.ceil(count / limit);
    const nextPage = page < totalPages ? page + 1 : null;

    return res.json({
      users: rows,
      page,
      nextPage,
      totalPages
    });
  } catch (error) {
    return res.json({ message: error.message });
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
