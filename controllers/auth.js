const bcrypt = require('bcrypt');
const User = require('../models/user');

const SignUpUser = async(req,res)=>
{
    try
    {
           const {name, username, email, password} = req.body;
           const existingUsername = await User.findOne({ where: { username } });
           const existingEmail = await User.findOne({ where: { email } });

             if (existingUsername && existingEmail)
                 {
                        return res.json({ message: "Username and email already in use" });
                 } 
             else if (existingUsername) 
                 {
                         return res.json({ message: "Username already in use" });
                 }
             else if (existingEmail) 
                 {
                         return res.json({ message: "Email already in use" });
                 }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password,saltRounds);
        const user = await User.create
        ({
           name,
           username,
           email,
           password:hashedPassword
        })
        res.json
        ({
        message: 'User signed up successfully',
        user: 
        {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email
        }
        });
    }
    catch(error)
    {
        res.json({message:error.message})
    }
}

const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({ message: "Email and password are required" });
    }

    const user = await User.unscoped().findOne({ where: { email } })
    if (!user) {
      return res.json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ message: "Invalid email or password" });
    }

    res.json({
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email
      }
    });

  } catch (error)
   {
    res.json({ message: error.message });
  }
};
module.exports = {SignUpUser,LoginUser}