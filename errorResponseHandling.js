function errorResponse(res, statusCode, message)
{
     return res.status(statusCode).json({
        errors: Array.isArray(message) ? message : [message],
    });
}

module.exports = errorResponse