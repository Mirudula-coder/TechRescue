const express = require('express');
const router = express.Router();
const Record = require('../models/Records'); // Ensure the path is correct

// DELETE Route - Delete a record by ID
router.delete('/:id', async (req, res) => {
    try {
        console.log('Delete request received for ID:', req.params.id);

        const record = await Record.findByIdAndDelete(req.params.id);
        if (!record) {
            return res.status(404).json({ message: 'Record not found' });
        }

        console.log('Record deleted successfully:', record);
        res.json({ message: 'Record deleted successfully', deletedRecord: record });
    } catch (error) {
        console.error('Error deleting record:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router; // ✅ Ensure only `router` is exported
