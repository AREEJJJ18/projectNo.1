const fs = require('fs');
const path = require('path');

function uploadImage(imageBuffer, fileName) 
{
    const uploadPath = path.join(__dirname, '..', 'uploads', fileName);
    fs.writeFileSync(uploadPath, imageBuffer);
    return uploadPath;
}

function deleteImage(filePath)
{
    if(fs.existsSync(filePath))
    {
          fs.unlinkSync(filePath);
    }
    else 
    {
        console.log(" File not found:", filePath);
    }
}

module.exports = { uploadImage, deleteImage }
