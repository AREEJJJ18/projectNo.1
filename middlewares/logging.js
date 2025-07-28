function userMiddleware(req, res, next)
{
    console.log("middleware for users");
    next();
}



module.exports = userMiddleware