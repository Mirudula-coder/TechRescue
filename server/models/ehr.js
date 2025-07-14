const mongoose = require('mongoose');

const ehrSchema = new mongoose.Schema({
    patientEmail: {
        type: String,
        required: true
    },
    doctorEmail: {
        type: String,
        required: true
    },
    grantedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('EHR', ehrSchema);
