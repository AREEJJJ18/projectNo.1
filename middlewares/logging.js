const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret_key = process.env.JWT_SECRET || 'fallback_secret';


function userMiddleware(req, res, next)
{
    console.log("middleware for users");
    next();
}

function verifyToken(req, res, next)
{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

     if (!token) 
        {
            return res.status(401).json({ message: 'Token missing' });
        }

     jwt.verify(token, secret_key, (err, decoded) => 
        {
            if (err) 
                {
                      return res.json({ message: 'Invalid or expired token' });
                }

    req.user = decoded; 
         next();
  });
}
module.exports = { userMiddleware, verifyToken }