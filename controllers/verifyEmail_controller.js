const User = require('../models/user');
const errorResponse = require('../Utilities/errorResponseHandling')
async function verifyEmail(req, res)
{
    try
    {
          const { hash } = req.query;
       if (!hash)
       {
           return errorResponse(res , 400 , "Verification hash is required");
       }
          const user = await User.findOne({ where: { email_verification_hash: hash } });
      if (!user)
       {
           return errorResponse(res , 404 , "Invalid or expired verification link");
       }
      if (user.isVerified) 
       {
           return errorResponse(res , 404 , "Email is already verified");
       }
        user.isVerified = true;
        user.email_verification_hash = null;
        await user.save();
          return res.status(200).json({message:"Email Verified Successfully"})
    }
    catch(error)
    {
        return errorResponse(res , 500 , "An Unexpected error occur while verifing email");
    }
}

module.exports = verifyEmail