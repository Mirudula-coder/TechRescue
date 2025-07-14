const express = require('express');
const Chat = require('../models/Chat'); // Assuming you have a Chat model
const User = require('../models/User'); // Assuming User model exists to fetch patient names

const router = express.Router();

// Fetch all unique patients who chatted with the doctor
router.get('/:doctorEmail', async (req, res) => {
    try {
        const { doctorEmail } = req.params;

        // Find unique patient emails who chatted with this doctor
        const chats = await Chat.find({ doctorEmail })
            .sort({ timestamp: -1 }) // Sort by latest message
            .select('patientEmail')
            .distinct('patientEmail');

        // Fetch patient names from the User collection
        const patients = await User.find({ email: { $in: chats } }).select('email name');

        res.json(patients);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
