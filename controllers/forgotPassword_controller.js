const crypto = require('crypto');
const User  = require("../models/user");
const sendMail = require("../Utilities/mailService");
const errorResponse = require("../Utilities/errorResponseHandling");

async function forgotPassword(req, res)
{
    try
    {
        const { email } = req.body;
        const user = await User.findOne({ where: { email } });
        if(!user)
        {
            return errorResponse(res, 404, "User not found with this email");
        }

        const hash = crypto.randomBytes(32).toString("hex").trim();

        user.reset_password_hash = hash;
        await user.save();

        const resetLink = `http://127.0.0.1:${process.env.PORT}/reset-password?token=${hash}`;

        await sendMail
        ({
             to: email,
             subject: "Password Reset Request",
             text: `Click this link to reset your password: ${resetLink}`,
             html: `<h2>Password Reset</h2>
                   <p>Click the link below to reset your password:</p>
                   <a href="${resetLink}">Reset Password</a>`
        });
        return res.status(200).json({ message: "Password reset email sent successfully" });
    }
    catch(error)
    {
        return errorResponse(res, 500, "Something went wrong while processing forgot password");
    }
}

module.exports = forgotPassword