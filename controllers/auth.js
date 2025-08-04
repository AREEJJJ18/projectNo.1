
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const { generateToken } = require('../Utilities/jwtService');
const errorResponse = require('../Utilities/errorResponseHandling');
const user_status = require('../constants/user_status');


const SignUpUser = async(req,res)=>
{
         const errors = validationResult(req);
         if (!errors.isEmpty())
           {
               return errorResponse(res, 422, errors.array());
           }
    try
    {
           const {name, username, email, password, user_status, role} = req.body;
           const existingUsername = await User.findOne({ where: { username } });
           const existingEmail = await User.findOne({ where: { email } });

             if (existingUsername && existingEmail)
                 {
                        return errorResponse(res, 409, 'Username and Email already in use');
                 } 
             else if (existingUsername) 
                 {
                        return errorResponse(res, 409, 'Username already in use'); 
                 }
             else if (existingEmail) 
                 {
                         return errorResponse(res, 409, 'Email already in use');
                 }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password,saltRounds);
        const user = await User.create
        ({
           name,
           username,
           email,
           password:hashedPassword,
           user_status,
           role: role || 'user'
        })

         const token = generateToken(user);

        res.status(201).json
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
        return errorResponse(res, 500, 'An unexpected error occurred while SignUp');
    }
}

const LoginUser = async (req, res) => 
  {
          const errors = validationResult(req);
          if (!errors.isEmpty()) 
            {
                 return errorResponse(res, 422, errors.array());
            }
  try {
    const { email, password } = req.body;

    if (!email || !password)
      {
           return errorResponse(res, 400, 'Email and Password are required');
      }

    const user = await User.unscoped().findOne({ where: { email } })
    if (!user)
      {
           return errorResponse(res, 401, 'Invalid Email or Password');
      }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) 
      {
          return errorResponse(res, 401, 'Invalid Email or Password');
      }
       
       const token = generateToken(user);

    res.status(200).json({
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
        return errorResponse(res, 500, 'An unexpected error occurred while Login');
   }
};
module.exports = {SignUpUser,LoginUser}