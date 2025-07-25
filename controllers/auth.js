const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const User = require('../models/user');
require('dotenv').config();
const secret_key = process.env.JWT_SECRET || 'fallback_secret';

const SignUpUser = async(req,res)=>
{
         const errors = validationResult(req);
         if (!errors.isEmpty())
           {
               return res.json({ errors: errors.array() });
           }
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

         const token = jwt.sign({ userId: user.id }, secret_key, { expiresIn: "1h" });

        res.json
        ({
        message: 'User signed up successfully',
        user: 
        {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email
        },
        token
        });
    }
    catch(error)
    {
        res.json({message:error.message})
    }
}

const LoginUser = async (req, res) => 
  {
          const errors = validationResult(req);
          if (!errors.isEmpty()) 
            {
                 return res.json({ errors: errors.array() });
            }
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
       
       const token = jwt.sign({userId: user.id}, secret_key, {expiresIn:"1h"});

    res.json({
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email
      },
      token
    });

  } catch (error)
   {
    res.json({ message: error.message });
  }
};
module.exports = {SignUpUser,LoginUser}