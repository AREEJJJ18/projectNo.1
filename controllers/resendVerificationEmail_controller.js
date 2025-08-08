const crypto = require('crypto');
const User = require('../models/user');
const sendMail = require('../Utilities/mailService');
const errorResponse = require('../Utilities/errorResponseHandling');
async function resendVerificationEmail(req, res)
{
    try
    {
    const { email } = req.body;
    const user = await  User.findOne({where: { email }});
    if (!user) 
        {
            return errorResponse(res, 404, 'User not found');
        }
    if (user.isVerified) 
        {
            return errorResponse(res, 400, 'User already verified');
        }
    
    const newHash = crypto.randomBytes(32).toString('hex');
    user.email_verification_hash = newHash;
    await user.save();

    const verificationUrl = `http://localhost:5000/api/verify-email?hash=${newHash}`;
    const subject = 'Resend: Verify your email address';
    const html = ` <div style="font-family: Arial, sans-serif;">
                   <h2>Hi ${user.name},</h2>
                   <p>You requested a new verification link.</p>
                   <a href="${verificationUrl}" style="
                   display: inline-block;
                   padding: 10px 20px;
                   background-color: #007bff;
                   color: white;
                   text-decoration: none;
                   border-radius: 5px;">
                   Verify Email
                   </a>
                   <p>Or paste this link into your browser:</p>
                   <p>${verificationUrl}</p>
                   </div>`;

    await sendMail({ to: user.email, subject, html });

    return res.status(200).json({ message: 'Verification email resent successfully' });
  } 
  catch (error) 
  {
    console.error(error);
    return errorResponse(res, 500, 'Failed to resend verification email');
  }
}

module.exports = resendVerificationEmail