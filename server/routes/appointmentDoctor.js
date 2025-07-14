const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const User = require('../models/User');

router.get('/doctor/:doctorEmail', async (req, res) => {
  const { doctorEmail } = req.params;

  try {
    const currentTime = new Date();

    // Find all appointments for this doctor
    const appointments = await Appointment.find({ doctorEmail });

    // Fetch patient details from Users collection
    const appointmentsWithNames = await Promise.all(
      appointments.map(async (appointment) => {
        const user = await User.findOne({ email: appointment.patientEmail });
        return {
          _id: appointment._id,
          date: appointment.date,
          startTime: appointment.startTime,
          endTime: appointment.endTime,
          patientName: user ? user.username : "Unknown Patient",
          appointmentDate: new Date(`${appointment.date}T${appointment.startTime}`)
        };
      })
    );

    // Sort appointments into past and future
    const upcoming = appointmentsWithNames
      .filter((a) => a.appointmentDate >= currentTime)
      .sort((a, b) => a.appointmentDate - b.appointmentDate);

    const past = appointmentsWithNames
      .filter((a) => a.appointmentDate < currentTime)
      .sort((a, b) => b.appointmentDate - a.appointmentDate);

    res.json({ upcoming, past });

  } catch (error) {
    console.error("Error fetching doctor's appointments:", error);
    res.status(500).json({ message: 'Server error.' });
  }
});

module.exports = router;
