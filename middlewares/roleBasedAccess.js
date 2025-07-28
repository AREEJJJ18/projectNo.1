function authorizeAdmin(req, res, next) 
{
  if (req.user && req.user.role === 'admin')
     {
         return next();
     } 
  else 
    {
         return res.status(403).json({ message: 'Forbidden: Admins only' });
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
         return res.status(403).json({ message: 'Forbidden: Admins or Users only' });
    }
}

function authorizeAdminOrUser(req, res, next) 
{
  if ( (req.user && req.user.role === 'admin' ) || (req.user && req.user.role === 'user'))
     {
         return next();
     } 
  else 
    {
         return res.status(403).json({ message: 'Forbidden: Admins only' });
    }
}


module.exports = { authorizeAdmin, authorizeUser, authorizeAdminOrUser };
