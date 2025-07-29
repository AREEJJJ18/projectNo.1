const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret_key = process.env.JWT_SECRET || 'fallback_secret';
const errorResponse = require('./errorResponseHandling');


function generateToken (user)
{
    const token = jwt.sign({ userId: user.id, role: user.role }, secret_key, { expiresIn: process.env.JWT_EXPIRES_IN || '1h' });
    return token;
}

function verifyToken(req, res, next)
 {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer '))
         {
               return errorResponse(res, 401, 'Token missing or malformed');
         }

    const token = authHeader.split(' ')[1];

    try 
    {
        const decoded = jwt.verify(token, secret_key);
        req.user = decoded;
        next();
    }
    catch (err) 
    {
            return errorResponse(res, 401, 'Invalid or Expired Token');
    }
}

module.exports = { generateToken , verifyToken }