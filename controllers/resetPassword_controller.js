const User = require('../models/user')
const bcrypt = require('bcrypt');
const errorResponse = require('../Utilities/errorResponseHandling')

async function resetPassword(req, res)
{
    try
    {
        const { token = "" } = req.query;
        const cleanToken = token.trim().replace(/\r?\n|\r/g, "");
        const { newPassword } = req.body;

        if (!token || !newPassword) 
         {
             return errorResponse(res, 400, "Token and new password are required");
         }

         const user = await User.findOne({ where: { reset_password_hash: cleanToken }})
        if(!user)
        {
            return errorResponse(res, 404, "Invalid or expired password reset token");
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.reset_password_hash = null;
        await user.save();
        return res.status(200).json({message:"Password has been reset Succesfully"})
    }
    catch(error)
    {
        return errorResponse(res, 500, "An error occurred while resetting the password");
    }

}

module.exports = resetPassword