const express = require('express');
const router = express.Router();
const EHR = require('../models/ehr');
const Doctor = require('../models/Doctor');
// Grant access to doctor
router.post('/grantAccess', async (req, res) => {
    try {
        const { patientEmail, doctorEmail } = req.body;

        if (!patientEmail || !doctorEmail) {
            return res.status(400).json({ error: "Both patientEmail and doctorEmail are required" });
        }

        // Check if access already exists
        const existingAccess = await EHR.findOne({ patientEmail, doctorEmail });
        if (existingAccess) {
            return res.status(400).json({ error: "Access already granted" });
        }

        const newEHR = new EHR({ patientEmail, doctorEmail });
        await newEHR.save();

        res.status(201).json({ message: "Access granted successfully" });
    } catch (error) {
        console.error("Error granting access:", error);
        res.status(500).json({ error: "Server error" });
    }
});
// Check if access is already granted
router.get('/checkAccess/:patientEmail/:doctorEmail', async (req, res) => {
    try {
        const { patientEmail, doctorEmail } = req.params;
        
        const existingAccess = await EHR.findOne({ patientEmail, doctorEmail });
        
        if (existingAccess) {
            return res.json({ accessGranted: true });
        } else {
            return res.json({ accessGranted: false });
        }
    } catch (error) {
        console.error("Error checking access:", error);
        res.status(500).json({ error: "Server error" });
    }
});
router.delete('/revokeAccess', async (req, res) => {
    try {
        const { patientEmail, doctorEmail } = req.body;

        // Remove the access record
        await EHR.findOneAndDelete({ patientEmail, doctorEmail });

        res.json({ message: 'Access revoked successfully' });
    } catch (error) {
        console.error('Error revoking access:', error);
        res.status(500).json({ error: 'Server error' });
    }
});
router.get('/getGrantedDoctors/:patientEmail', async (req, res) => {
    try {
        const { patientEmail } = req.params;

        // Find all doctorEmail records for this patient
        const grantedRecords = await EHR.find({ patientEmail });

        if (!grantedRecords.length) {
            return res.status(404).json({ message: 'No granted doctors found' });
        }

        // Extract doctor emails
        const doctorEmails = grantedRecords.map(record => record.doctorEmail);

        // Fetch doctor details
        const doctorDetails = await Doctor.find({ email: { $in: doctorEmails } });

        res.json(doctorDetails);
    } catch (error) {
        console.error('Error fetching granted doctors:', error);
        res.status(500).json({ error: 'Server error' });
    }
});
module.exports = router;
