const express = require('express');
const router = express.Router();
const Record = require('../models/Records'); // Ensure correct path to model

// Test route for debugging
router.get('/test', (req, res) => {
    res.send('Records route working!');
});

// Fetch records by email
router.get('/:email', async (req, res) => {
    try {
        console.log("Fetching records for:", req.params.email);
        const records = await Record.find({ email: req.params.email }).sort({ uploadedAt: -1 });

        if (!records.length) {
            return res.status(404).json({ message: 'No records found' });
        }

        res.json(records);
    } catch (err) {
        console.error('Error fetching records:', err);
        res.status(500).send('Server error');
    }
});

module.exports = router;
