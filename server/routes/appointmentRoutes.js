const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");
const Doctor = require("../models/Doctor"); // Import Doctor model
const User = require("../models/User");
const nodemailer = require('nodemailer');


router.get("/available/:doctorEmail/:date", async (req, res) => {
    try {
        const { doctorEmail, date } = req.params;
        console.log(`Fetching available slots for ${doctorEmail} on ${date}`);

        // Fetch doctor's available timings from database
        const doctor = await Doctor.findOne({ email: doctorEmail });

        if (!doctor) {
            return res.status(404).json({ error: "Doctor not found" });
        }

        const availableStartTime = doctor.availableStartTime; // Fetch from DB
        const availableEndTime = doctor.availableEndTime; // Fetch from DB

        // Fetch all booked appointments for this doctor on the given date
        const appointments = await Appointment.find({ doctorEmail, date });

        // Sort booked appointments by startTime
        const bookedTimes = appointments
            .map(app => ({
                startTime: app.startTime,
                endTime: app.endTime
            }))
            .sort((a, b) => a.startTime.localeCompare(b.startTime));

        // Calculate available slots
        let availableSlots = [];
        let lastEndTime = availableStartTime; // Start from doctor's available start time

        for (let i = 0; i < bookedTimes.length; i++) {
            let { startTime, endTime } = bookedTimes[i];

            // If there is a gap between the last end time and the next appointment start time, add it as an available slot
            if (lastEndTime < startTime) {
                availableSlots.push({ startTime: lastEndTime, endTime: startTime });
            }

            // Update lastEndTime to the end of this appointment
            lastEndTime = endTime;
        }

        // If there is still time left after the last appointment, add it
        if (lastEndTime < availableEndTime) {
            availableSlots.push({ startTime: lastEndTime, endTime: availableEndTime });
        }

        // Send response with corrected available slots
        res.json({ availableStartTime, availableEndTime, bookedTimes, availableSlots });
    } catch (error) {
        console.error("Error fetching available slots:", error);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;


// ✅ Book an appointment with validation
router.post("/book", async (req, res) => {
    try {
        const { patientEmail, doctorEmail, date, startTime, endTime } = req.body;

        // Check for overlapping appointments
        const overlappingAppointment = await Appointment.findOne({
            doctorEmail,
            date,
            $or: [
                { startTime: { $lt: endTime }, endTime: { $gt: startTime } }, // Overlaps start
                { startTime: { $gte: startTime, $lt: endTime } }, // Overlaps within range
            ],
        });

        if (overlappingAppointment) {
            return res.status(400).json({ message: "Enter a valid appointment range." });
        }

        // Create new appointment
        const newAppointment = new Appointment({ patientEmail, doctorEmail, date, startTime, endTime });
        await newAppointment.save();

        res.json({ message: "Appointment Booked Successfully!" });
    } catch (error) {
        console.error("Error booking appointment:", error);
        res.status(500).json({ error: "Server error" });
    }
});
router.get('/:patientEmail', async (req, res) => {
    const { patientEmail } = req.params;
    try {
        const appointments = await Appointment.find({ patientEmail });

        // Fetch doctor details for each appointment
        const appointmentsWithDoctorDetails = await Promise.all(
            appointments.map(async (appointment) => {
                const doctor = await Doctor.findOne({ email: appointment.doctorEmail });

                return {
                    _id: appointment._id,
                    doctorEmail: appointment.doctorEmail, // ✅ Add this line
                    doctorName: doctor ? doctor.fullName : 'Unknown Doctor',
                    doctorProfilePic: doctor ? doctor.profilePic : '',
                    date: appointment.date,
                    startTime: appointment.startTime,
                    endTime: appointment.endTime,
                };
            })
        );

        res.json(appointmentsWithDoctorDetails);
    } catch (error) {
        console.error('Error fetching appointments:', error);
        res.status(500).json({ message: 'Server error.' });
    }
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'nalinakshakartikka@gmail.com',
      pass: 'epan lgsp tcxz tzsj',
    },
    tls: {
      rejectUnauthorized: false, // Ignore SSL errors
    },
  });
  
  router.delete('/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      console.log('DELETE /api/appointments/:id hit with ID:', id);
  
      // Fetch appointment details before deletion
      const appointment = await Appointment.findById(id);
      if (!appointment) {
        return res.status(404).json({ message: 'Appointment not found.' });
      }
      console.log('Appointment found:', appointment);
  
      // Fetch patient and doctor details from the Users collection
      const patient = await User.findOne({ email: appointment.patientEmail });
      const doctor = await Doctor.findOne({ email: appointment.doctorEmail });
      if (!patient) {
        console.log('Patient not found in Users collection.');
      } else {
        console.log('Fetched Patient:', patient);
      }
      
  
      // Send cancellation email to the patient
      if (patient) {
        const patientMailOptions = {
          from: 'nalinakshakartikka@gmail.com',
          to: appointment.patientEmail,
          subject: 'Appointment Cancelled',
          text: `Dear ${patient.username}, your appointment on ${appointment.date} at ${appointment.startTime} has been cancelled.`,
        };
  
        transporter.sendMail(patientMailOptions, (error, info) => {
          if (error) {
            console.error('Error sending email to patient:', error);
          } else {
            console.log('Email sent to patient:', info.response);
          }
        });
      } else {
        console.log('Patient not found in Users collection.');
      }
  
      // Send cancellation email to the doctor
      if (doctor) {
        const doctorMailOptions = {
          from: 'nalinakshakartikka@gmail.com',
          to: appointment.doctorEmail,
          subject: 'Appointment Cancelled',
          text: `Dear Dr. ${doctor.fullName}, your appointment with ${patient ? patient.username : 'a patient'} on ${appointment.date} at ${appointment.startTime} has been cancelled.`,
        };
  
        transporter.sendMail(doctorMailOptions, (error, info) => {
          if (error) {
            console.error('Error sending email to doctor:', error);
          } else {
            console.log('Email sent to doctor:', info.response);
          }
        });
      } else {
        console.log('Doctor not found in Users collection.');
      }
  
      // Finally, delete the appointment after sending emails
      await Appointment.findByIdAndDelete(id);
      console.log('Appointment deleted from DB:', id);
      res.json({ message: 'Appointment cancelled successfully.' });
  
    } catch (error) {
      console.error('Error cancelling appointment:', error);
      res.status(500).json({ message: 'Server error.' });
    }
  });
  
  module.exports = router;
