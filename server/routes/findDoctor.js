const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');

// Find doctors based on filters (name, hospital name, available time)
router.get('/', async (req, res) => {
  try {
    const { name, hospitalName, availableTime } = req.query;

    // Build the search query dynamically
    let query = { isApproved: true }; // Check only approved doctors

    if (name) {
      query.fullName = { $regex: new RegExp(name, 'i') }; // Case-insensitive search
    }
    if (hospitalName) {
      query.hospitalName = { $regex: new RegExp(hospitalName, 'i') };
    }
    if (availableTime) {
      query.$and = [
        { availableStartTime: { $lte: availableTime } }, // Doctor's available start time should be <= search time
        { availableEndTime: { $gte: availableTime } },   // Doctor's available end time should be >= search time
      ];
    }

    const doctors = await Doctor.find(query);
    res.json(doctors);
  } catch (error) {
    console.error('Error finding doctors:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
