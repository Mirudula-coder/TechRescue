const express = require('express');
const router = express.Router();
const Chat = require('../models/Chat');
const User = require('../models/User');  // Import the User model

// Get patients the doctor has chatted with (with names)
router.get('/getDoctorChats/:doctorEmail', async (req, res) => {
  const { doctorEmail } = req.params;

  try {
    // Find chats related to this doctor
    const chats = await Chat.find({ doctorEmail });

    // Extract unique patient emails
    const patientEmails = [...new Set(chats.map(chat => chat.patientEmail))];

    // Find names for these patients from the Users model
    const patients = await User.find({ email: { $in: patientEmails } }, 'email username');

    res.json(patients);
  } catch (error) {
    console.error('Error fetching doctor chats:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Fetch chat between doctor and patient
router.get('/:doctorEmail/:patientEmail', async (req, res) => {
  const { doctorEmail, patientEmail } = req.params;

  try {
    let chat = await Chat.findOne({ doctorEmail, patientEmail });
    if (!chat) {
      chat = await Chat.create({ doctorEmail, patientEmail, messages: [] });
    }
    res.json(chat);
  } catch (error) {
    console.error('Error fetching chat:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Send message
router.post('/:doctorEmail/:patientEmail', async (req, res) => {
  const { doctorEmail, patientEmail } = req.params;
  const { sender, content } = req.body;

  try {
    const chat = await Chat.findOneAndUpdate(
      { doctorEmail, patientEmail },
      { $push: { messages: { sender, content } } },
      { new: true, upsert: true }
    );
    res.json(chat);
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
