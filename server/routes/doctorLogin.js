const express = require('express');
const Doctor = require('../models/Doctor');

const router = express.Router();

// Doctor Login Route
router.post('/', async (req, res) => {
  try {
    const { email, licenseNumber } = req.body;

    if (!email || !licenseNumber) {
      return res.status(400).json({ message: 'Email and License Number are required' });
    }

    const doctor = await Doctor.findOne({ email });

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found. Please register first.' });
    }

    if (doctor.isApproved === "never") {
      return res.status(403).json({ message: 'Admin has aborted access' });
    }

    if (doctor.isApproved === "false") {
      return res.status(403).json({ message: 'Your registration is pending admin approval' });
    }

    if (doctor.licenseNumber !== licenseNumber) {
      return res.status(401).json({ message: 'Incorrect License Number' });
    }

    res.status(200).json({ message: 'Login successful' });

  } catch (error) {
    console.error('Server Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
