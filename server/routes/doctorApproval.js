const express = require('express');
const Doctor = require('../models/Doctor');
const nodemailer = require('nodemailer');

const router = express.Router();

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'nalinakshakartikka@gmail.com',
    pass: 'epan lgsp tcxz tzsj', // Use App Password if 2FA is enabled
  },
  tls: {
    rejectUnauthorized: false,  // Bypass SSL verification
  },
});

// Get all doctors with isApproved = "false"
router.get('/unapproved', async (req, res) => {
  try {
    const doctors = await Doctor.find({ isApproved: "false" });
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update doctor approval status and send email
router.put('/approve/:id', async (req, res) => {
  try {
    const { isApproved } = req.body;
    
    // Find the doctor first
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    // Update approval status
    await Doctor.findByIdAndUpdate(req.params.id, { isApproved });

    // Send email based on approval status
    const mailOptions = {
      from: 'nalinakshakartikka@gmail.com',
      to: doctor.email,
      subject: isApproved === 'true' ? 'Approval Status: Approved' : 'Approval Status: Not Approved',
      text: isApproved === 'true'
        ? `Dear Dr. ${doctor.fullName},\n\nYour profile has been approved by the admin. You can now log in and access the system.\n\nRegards,\nAdmin`
        : `Dear Dr. ${doctor.fullName},\n\nOops! Your profile has not been approved by the admin.\n\nRegards,\nAdmin`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });

    res.json({ message: 'Doctor status updated and email sent' });

  } catch (error) {
    console.error('Error approving doctor:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
