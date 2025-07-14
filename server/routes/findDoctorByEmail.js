const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');

// Route: GET /api/doctors/findEmail/:email
router.get('/findEmail/:email', async (req, res) => {
    try {
        const doctor = await Doctor.findOne({ email: req.params.email });
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        res.json(doctor);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
