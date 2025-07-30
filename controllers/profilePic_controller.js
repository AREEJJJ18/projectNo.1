const fs = require('fs');
const path = require('path');
const errorResponse = require('../Utilities/errorResponseHandling');
const { uploadImage, deleteImage } = require('../Utilities/imageService');
const User = require('../models/user');

 const uploadProfilePicture = async(req, res)=>
  {
    
      try
      {
            if (!req.file) 
              {
                  return errorResponse(res, 400, 'No File Uploaded'); 
              }
             

            const savedPath = uploadImage(req.file.buffer, req.file.originalname);
    
            return res.status(200).json
            ({
                 message: 'Profile picture uploaded successfully',
                 path: savedPath
            });
      }
      catch (error)
      {
            return errorResponse(res, 500, 'Image Upload Failed'); 
      }
   }

   const updateProfilePicture = async (req, res) =>
   {
      try {
        if (!req.file) 
            {
                return errorResponse(res, 400, 'No file uploaded');
            }

                    const userId = req.params.id;
                    const loggedInUserId = req.user.userId || req.user.id;

         if (parseInt(userId) !== parseInt(loggedInUserId)) 
            {
                return errorResponse(res, 403, 'You are not allowed to update this profile picture');
            }
                    
                    const user = await User.findByPk(userId);
        if (!user)
            {
                return errorResponse(res, 404, 'User not found');
            }
        if (user.profile_picture)
            {
                deleteImage(user.profile_picture);
            }
                   const savedPath = uploadImage(req.file.buffer, req.file.originalname);
                   const fileUrl = '/uploads/' + path.basename(savedPath);
                   user.profile_picture = fileUrl;
                   await user.save();
                   return res.status(200).json
            ({
                    message: 'Profile picture updated successfully',
                    profile_picture: fileUrl
            });
           }
           catch (error)
           {
                return errorResponse(res, 500, 'Image Upload Failed'); 
           }
    }

    const deleteProfilePicture = async (req, res) =>
    {
        try
           {
                 const userId = req.params.id;
                 const loggedInUserId = req.user.userId || req.user.id;

                     if (parseInt(userId) !== parseInt(loggedInUserId)) 
                      {
                            return errorResponse(res, 403, 'You are not allowed to delete this profile picture');
                      }

                 const user = await User.findByPk(userId);

                     if (!user) 
                     {
                            return errorResponse(res, 404, 'User not found');
                     }

                     if (user.profile_picture)
                      {
                            return errorResponse(res, 404, 'Profile picture not found');
                      }

                 deleteImage(user.profile_picture);
                 user.profile_picture = null;
                 await user.save();
                 return res.status(200).json
                   ({
                            message: 'Profile picture deleted successfully',
                   });
           } 
        catch (error)
           {
                return errorResponse(res, 500, 'Failed to Delete Profile Picture'); 
           }   

    }

   module.exports ={ uploadProfilePicture, updateProfilePicture, deleteProfilePicture }