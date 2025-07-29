const errorResponse = require('../Utilities/errorResponseHandling');

function authorizeAdmin(req, res, next) 
{
  if (req.user && req.user.role === 'admin')
     {
         return next();
     } 
  else 
    {
         return errorResponse(res, 403, 'Access denied : Admins Only');
    }
}

function authorizeUser(req, res, next) 
{
  if (req.user && req.user.role === 'user')
     {
         return next();
     } 
  else 
    {
         return errorResponse(res, 403, 'Access denied : Users Only');
    }
}

function authorizeAdminOrUser(req, res, next) 
{
  if ((req.user && req.user.role === 'admin' ) || (req.user && req.user.role === 'user'))
     {
         return next();
     } 
  else 
    {
         return errorResponse(res, 403, 'Access denied : Admins or Users Only');
    }
}


module.exports = { authorizeAdmin, authorizeUser, authorizeAdminOrUser };
