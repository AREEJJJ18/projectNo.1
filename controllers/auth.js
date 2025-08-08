
const { validationResult } = require('express-validator');
const crypto = require('crypto')
const bcrypt = require('bcrypt');
const User = require('../models/user');
const sendMail = require('../Utilities/mailService');
const { generateToken } = require('../Utilities/jwtService');
const errorResponse = require('../Utilities/errorResponseHandling');
const USER_STATUS = require('../constants/user_status');


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
           const finalUserStatus = user_status || USER_STATUS.ACTIVE;
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
        const EmailVerificationHash = crypto.randomBytes(32).toString('hex');
        const user = await User.create
        ({
           name,
           username,
           email,
           password:hashedPassword,
           user_status: finalUserStatus,
           role: role || 'user',
           isVerified: false,
           email_verification_hash: EmailVerificationHash
        })
          const verificationUrl = `http://localhost:5000/api/verify-email?hash=${EmailVerificationHash}`;

         const subject = 'Verify your email address';
         const html = ` <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                        <h2>Welcome, ${user.name}!</h2>
                        <p>Thank you for signing up. Please verify your email by clicking the button below:</p>
                        <a href="${verificationUrl}" style="
                         display: inline-block;
                         padding: 10px 20px;
                         font-size: 16px;
                         color: #ffffff;
                         background-color: #007bff;
                         text-decoration: none;
                         border-radius: 5px;
                         margin-top: 10px;
                         ">
                         Verify Email
                         </a>
                         <p>If the button doesn’t work, copy and paste this link into your browser:</p>
                         <p>${verificationUrl}</p>
                         </div>
                         `;

       
        await sendMail({
            to: user.email,
            subject,
            html
           });

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
        console.error('SignUp Error:', error);
        return errorResponse(res, 500, error.message ||'An unexpected error occurred while SignUp');
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
       
    if (!user.isVerified)
      {
          return errorResponse(res, 401, 'Please verify your email before logging in');
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