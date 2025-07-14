const express = require('express');
const multer = require('multer');
const Doctor = require('../models/Doctor');
require('dotenv').config();

const router = express.Router();

// File Upload Setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

// Register Route
router.post('/', upload.single('profilePic'), async (req, res) => {
  try {
    const { 
      fullName, email, specialization, qualification, experience, 
      licenseNumber, phoneNumber, hospitalName, clinicAddress, 
      availableStartTime, availableEndTime 
    } = req.body;
    
    if (!fullName || !email || !specialization || !qualification || !experience || 
        !licenseNumber || !phoneNumber || !hospitalName || !clinicAddress || 
        !availableStartTime || !availableEndTime) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingDoctor = await Doctor.findOne({ email });

    if (existingDoctor) {
      if (existingDoctor.isApproved === "never") {
        return res.status(403).json({ message: 'Admin has aborted access' });
      } 
      if (existingDoctor.isApproved === "false") {
        return res.status(200).json({ message: 'Already registered. Request is sent to admin' });
      } 
      if (existingDoctor.isApproved === "true") {
        return res.status(200).json({ message: 'You are already approved. Please login' });
      }
    }

    const doctorData = { 
      ...req.body, 
      profilePic: req.file ? req.file.path : null, 
      isApproved: "false"
    };
    
    const newDoctor = new Doctor(doctorData);
    await newDoctor.save();

    res.status(201).json({ message: 'Request is sent to admin' });

  } catch (error) {
    console.error('Server Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
