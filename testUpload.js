const express = require('express');
const multer = require('multer');
const app = express();

const upload = multer({ storage: multer.memoryStorage() });

app.patch('/test', upload.single('profilePic'), (req, res) => {
    console.log("📂 File:", req.file);
    console.log("📜 Body:", req.body);
    res.json({ file: req.file, body: req.body });
});

app.listen(4000, () => console.log("✅ Test server running on port 4000"));
