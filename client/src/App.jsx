import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserType from './pages/userType';
import UserLogin from './pages/userLogin';
import DoctorLogin from './pages/doctorLogin';
import DoctorRegister from './pages/doctorRegister';
import DoctorDashboard from './pages/doctorDashboard';
import AdminLogin from './pages/adminLogin';
import UserRegister from './pages/userRegister';
import UserHome from './pages/userHome';
import AdminHome from './pages/adminHome';
import ApproveDoctors from './pages/approveDoctors';
import AppointmentScheduling from './pages/appointmentScheduling';
import EHR from './pages/EHR';
import SchemeMatching from './pages/schemeMatching';
import Search from './pages/Search';
import Upload from './pages/Upload';
import View from './pages/View';
import Revoke from './pages/Revoke';
import Book from './pages/Book';
import Delete from './pages/Delete';
import ViewScheduledAppointments from './pages/viewScheduledAppointments';
import ViewAppointments from './pages/viewAppointments';
import CancelAppointment from './pages/cancelAppointment';
import ViewRecords from './pages/viewRecords';
import DisplayRecord from './pages/displayRecord';
import Display from './pages/Display';
import Chat from './pages/Chat';
import  Submit from './pages/Submit';
import DoctorChat from './pages/DoctorChat';
import ChatWithPatient from './pages/ChatWithPatient';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserType />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/doctor-login" element={<DoctorLogin />} />
        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/user-register" element={<UserRegister />} />
        <Route path="/user-home" element={<UserHome />} />
        <Route path="/doctor-register" element={<DoctorRegister />} />
        <Route path="/admin-home" element={<AdminHome />} />
        <Route path="/approve-doctors" element={<ApproveDoctors />} />
        <Route path="/appointment-scheduling" element={<AppointmentScheduling />} />
        <Route path="/EHR" element={<EHR />} />
        <Route path="/scheme-matching" element={<SchemeMatching />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/search" element={<Search />} />
        <Route path="/view" element={<View />} />
        <Route path="/revoke" element={<Revoke />} />
        <Route path="/book" element={<Book />} />
        <Route path="/delete" element={<Delete />} />
        <Route path="/view-appointments" element={<ViewAppointments />} />
        <Route path="/view-records" element={<ViewRecords />} />
        <Route path="/display-record" element={<DisplayRecord />} />
        <Route path="/view-scheduled-appointments" element={<ViewScheduledAppointments />} />
        <Route path="/display" element={<Display />} />
        <Route path="/submit" element={<Submit />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/doctor-chat" element={<DoctorChat />} />
        <Route path="/chat-with-patient" element={<ChatWithPatient />} />
        <Route path="/cancel-appointments" element={<CancelAppointment />} />
      </Routes>
    </Router>
  );
}

export default App;
