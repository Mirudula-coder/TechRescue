const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const User = require('../models/User');  // Import User model
const nodemailer = require('nodemailer');

// Cancel appointment and send email
router.delete('/:id', async (req, res) => {
  try {
    console.log('DELETE /api/appointments/:id hit with ID:', req.params.id);

    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
    console.log('Appointment found:', appointment);

    // Fetch patient details from Users collection
    const patient = await User.findOne({ email: appointment.patientEmail });
    if (!patient) return res.status(404).json({ message: 'Patient not found' });
    console.log('Patient found:', patient);

    // Send cancellation email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'nalinakshakartikka@gmail.com',
        pass: 'epan lgsp tcxz tzsj',
      },
      tls: {
        rejectUnauthorized: false,  // Ignore SSL errors
      },
    });

    const mailOptions = {
      from: 'nalinakshakartikka@gmail.com',
      to: appointment.patientEmail,
      subject: 'Appointment Cancelled',
      text: `Dear ${patient.username}, your appointment on ${appointment.date} at ${appointment.startTime} has been cancelled.`,
    };

    transporter.sendMail(mailOptions, async (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ message: 'Failed to send cancellation email' });
      } else {
        console.log('Email sent:', info.response);

        // Delete the appointment only after email is sent
        await Appointment.findByIdAndDelete(req.params.id);
        console.log('Appointment deleted from DB:', req.params.id);
        res.status(200).json({ message: 'Appointment cancelled successfully.' });
      }
    });

  } catch (error) {
    console.error('Internal Server Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
