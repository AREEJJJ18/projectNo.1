const bcrypt = require('bcrypt');
const User = require('../models/user');
const errorResponse = require('../Utilities/errorResponseHandling');

async function updatePassword(req, res) {
    try {
        const userId = req.user.id; 
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return errorResponse(res, 400, "Current password and new password are required");
        }

        const user = await User.findByPk(userId);
        if (!user) {
            return errorResponse(res, 404, "User not found");
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return errorResponse(res, 401, "Current password is incorrect");
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        return res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        console.error("Update Password Error:", error);
        return errorResponse(res, 500, "Something went wrong while updating password");
    }
}

module.exports = updatePassword;
