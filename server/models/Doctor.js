const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  specialization: { type: String, required: true },
  qualification: { type: String, required: true },
  experience: { type: String, required: true },
  licenseNumber: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  hospitalName: { type: String, required: true },
  clinicAddress: { type: String, required: true },
  availableStartTime: { type: String, required: true },
  availableEndTime: { type: String, required: true },
  profilePic: { type: String },
  isApproved: { type: String, default: "false" }
});

module.exports = mongoose.model('Doctor', DoctorSchema);
