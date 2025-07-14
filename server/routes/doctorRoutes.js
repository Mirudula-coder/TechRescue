// Backend Route (routes/doctorRoutes.js or similar)
const express = require('express');
const router = express.Router();
const EHR = require('../models/ehr'); // EHR model
const User = require('../models/User'); // User model

// Fetch patient records for a doctor
router.get('/doctor/records/:doctorEmail', async (req, res) => {
  const { doctorEmail } = req.params;
  try {
    const ehrs = await EHR.find({ doctorEmail });
    const patientEmails = ehrs.map(ehr => ehr.patientEmail);
    const patients = await User.find({ email: { $in: patientEmails } }, 'username email');
    res.json(patients);
  } catch (error) {
    console.error('Error fetching records:', error);
    res.status(500).json({ message: 'Failed to fetch records' });
  }
});

module.exports = router;