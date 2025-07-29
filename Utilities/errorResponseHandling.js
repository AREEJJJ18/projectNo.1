function errorResponse(res, statusCode, message)
{
     return res.status(statusCode).json({
        request_status : "failed",
        errors: Array.isArray(message) ? message : [message],
    });
}

module.exports = errorResponse