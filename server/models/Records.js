const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
    email: { type: String, required: true },
    certificateName: { type: String, required: true },
    filePath: { type: String, required: true },
    message: { type: String, required: false },
    uploadDate: { type: Date, default: Date.now }
});

// ✅ Check if model exists before compiling
const Record = mongoose.models.Record || mongoose.model('Record', recordSchema);

module.exports = Record;
