const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const Record = require('../models/Records');

const router = express.Router();

// Ensure 'uploads/' directory exists
const uploadDir = path.join(__dirname, '../uploads/');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Storage setup for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });
router.get('/test', (req, res) => {
    res.send('Upload route working!');
});
// Upload file
router.post('/', upload.single('file'), async (req, res) => {
    console.log("Upload API hit!");
    console.log("Request Body:", req.body);
    console.log("File received:", req.file);

    try {
        const { certificateName, message, email } = req.body;

        if (!req.file) {
            console.error("No file uploaded.");
            return res.status(400).json({ error: 'No file uploaded.' });
        }

        const newRecord = new Record({
            email,
            certificateName,
            filePath: req.file.path,
            message,
        });

        await newRecord.save();
        res.status(201).json({ message: 'File uploaded successfully', filePath: req.file.path });
    } catch (err) {
        console.error('Upload Error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
