const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  doctorEmail: { type: String, required: true },
  patientEmail: { type: String, required: true },
  messages: [
    {
      sender: String,
      content: String,
      timestamp: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model('Chat', chatSchema);
