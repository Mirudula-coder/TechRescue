require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

// Routes
const userRegister = require('./routes/userRegister');
app.use('/api/users/register', userRegister);

const userLogin = require('./routes/userLogin');
app.use('/api/users/login', userLogin);
const user = require('./routes/userLogin');
app.use('/api/users', user);

const doctorRegister = require('./routes/doctorRegister');
app.use('/api/doctors/register', doctorRegister);

const doctorLogin = require('./routes/doctorLogin');
app.use('/api/doctors/login', doctorLogin);

const doctorApproval = require('./routes/doctorApproval');
app.use('/api/doctors', doctorApproval);

const upload = require('./routes/upload');
app.use('/api/upload', upload);

const recordsRoute = require('./routes/records');
app.use('/api/records', recordsRoute);

const deleteRoute = require('./routes/delete');
app.use('/api/delete', deleteRoute);

const findDoctorRoutes = require('./routes/findDoctor');
app.use('/api/doctors/find', findDoctorRoutes);

const findDoctorByEmailRoutes = require('./routes/findDoctorByEmail');
app.use('/api/doctors', findDoctorByEmailRoutes);

const ehrRoutes = require('./routes/ehrRoutes');
app.use('/api/ehr', ehrRoutes);

const appointmentRoutes = require("./routes/appointmentRoutes");
app.use("/api/appointments", appointmentRoutes);

const appointmentDoctorRoutes = require('./routes/appointmentDoctor');
app.use('/api/appointments', appointmentDoctorRoutes);

const doctorRoutes = require('./routes/doctorRoutes');
app.use('/api', doctorRoutes);

const appointments = require('./routes/appointments');
app.use('/api/appointmentsActions', appointments);

const chatRoutes = require('./routes/chatRoutes');
app.use('/api/chat', chatRoutes);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
const chatHistoryRoutes = require('./routes/getDoctorChats');
app.use('/api/getDoctorChats', chatHistoryRoutes);



// Test Routes
app.get('/', (req, res) => res.send('HMS API Running'));
app.get('/test', (req, res) => res.send('Server is running!'));

// Create HTTP Server and Attach Socket.io
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('joinRoom', ({ doctorEmail, patientEmail }) => {
    const roomId = `${doctorEmail}-${patientEmail}`;
    socket.join(roomId);
    console.log(`${socket.id} joined room: ${roomId}`);
  });

  socket.on('sendMessage', (messageData) => {
    const roomId = `${messageData.doctorEmail}-${messageData.patientEmail}`;
    io.to(roomId).emit('receiveMessage', messageData);
    console.log(`Message sent to room ${roomId}:`, messageData);
  });

  socket.on('disconnect', () => console.log('Client disconnected'));
});

// MongoDB Connection and Server Start
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    const PORT = process.env.PORT || 5000;
    server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error('MongoDB Connection Error:', err));
