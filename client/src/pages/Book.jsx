import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Book = () => {
    const navigate = useNavigate();
    const [date, setDate] = useState("");
    const [availableSlots, setAvailableSlots] = useState([]);
    const [bookedTimes, setBookedTimes] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showSlots, setShowSlots] = useState(false);

    const userEmail = localStorage.getItem("userEmail");
    const doctorEmail = localStorage.getItem("selectedDoctorEmail");

    const today = new Date();
    const minDate = new Date(today);
    minDate.setDate(minDate.getDate() + 1);
    const maxDate = new Date(today);
    maxDate.setMonth(maxDate.getMonth() + 1);
    const formatDate = (date) => date.toISOString().split("T")[0];
    const minDateString = formatDate(minDate);
    const maxDateString = formatDate(maxDate);

    const fetchAvailableSlots = async () => {
        if (!date) {
            alert("Please select a date.");
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`http://localhost:5000/api/appointments/available/${doctorEmail}/${date}`);
            const data = await response.json();

            if (data.availableStartTime && data.availableEndTime && Array.isArray(data.bookedTimes)) {
                setBookedTimes(data.bookedTimes);
                const slots = calculateAvailableSlots(data.availableStartTime, data.availableEndTime, data.bookedTimes);
                setAvailableSlots(slots);
                setShowSlots(true);
            } else {
                setAvailableSlots([]);
                setShowSlots(false);
            }
        } catch (error) {
            console.error("Error fetching available slots:", error);
            setAvailableSlots([]);
            setShowSlots(false);
        }
        setLoading(false);
    };

    const calculateAvailableSlots = (startTime, endTime, bookedTimes) => {
        let slots = [];
        let current = new Date(`1970-01-01T${startTime}:00`);
        const end = new Date(`1970-01-01T${endTime}:00`);
        const lunchStart = new Date(`1970-01-01T12:30:00`);
        const lunchEnd = new Date(`1970-01-01T13:30:00`);

        while (current < end) {
            let slotEnd = new Date(current);
            slotEnd.setMinutes(slotEnd.getMinutes() + 15);
            if (slotEnd > end || (current >= lunchStart && slotEnd <= lunchEnd)) {
                current.setMinutes(current.getMinutes() + 5);
                continue;
            }

            let slotString = current.toTimeString().slice(0, 5);
            let slotEndString = slotEnd.toTimeString().slice(0, 5);

            if (!bookedTimes.some(booked => booked.startTime === slotString)) {
                slots.push({ startTime: slotString, endTime: slotEndString });
            }

            current.setMinutes(current.getMinutes() + 20);
        }
        return slots;
    };

    const bookAppointment = async () => {
        if (!selectedSlot) {
            alert("Please select a time slot.");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/appointments/book", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    patientEmail: userEmail,
                    doctorEmail,
                    date,
                    startTime: selectedSlot.startTime,
                    endTime: selectedSlot.endTime,
                }),
            });

            if (response.ok) {
                alert("Appointment Booked Successfully!");
                setSelectedSlot(null);
                fetchAvailableSlots();
                navigate('/appointment-scheduling');
            } else {
                const data = await response.json();
                alert(data.message || "Failed to book appointment.");
            }
        } catch (error) {
            console.error("Error booking appointment:", error);
        }
    };

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h2>Book Appointment</h2>

            <label style={{ fontSize: "18px", marginRight: "10px", marginTop: "20px" }}>Enter Date:</label>
            <input 
                type="date" 
                value={date} 
                onChange={(e) => setDate(e.target.value)} 
                style={{ padding: "10px" }} 
                min={minDateString}
                max={maxDateString}
            />

            <button onClick={fetchAvailableSlots} style={{ margin: "15px auto", padding: "12px 20px", fontSize: "16px", background: "#007bff", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}>Search Slots</button>

            {loading && <p>Loading available slots...</p>}

            {showSlots && (
                <div style={{ display: "flex", justifyContent: "center", gap: "40px", marginTop: "80px" }}>
                    <div style={{ background: "#fff", padding: "20px", borderRadius: "15px", textAlign: "left", width: "45%", boxShadow: "0 0 15px rgba(0, 123, 255, 0.5)" }}>
                        <h3>Available Time Slots</h3>
                        {availableSlots.length > 0 ? (
                            <ul style={{ listStyle: "none", padding: 0 }}>
                                {availableSlots.map((slot, index) => (
                                    <li key={index} style={{ marginBottom: "5px" }}>
                                        <button 
                                            onClick={() => setSelectedSlot(slot)}
                                            style={{ padding: "10px", margin: "5px", width: "100%", background: selectedSlot === slot ? "#28a745" : "#007bff", color: "#fff", border: "none", cursor: "pointer" }}
                                        >
                                            {slot.startTime} - {slot.endTime}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        ) : <p>No available slots found.</p>}
                    </div>
                </div>
            )}
            {selectedSlot && (
                <button onClick={bookAppointment} style={{ marginTop: "20px", padding: "12px 20px", fontSize: "16px", background: "#28a745", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}>Book Appointment</button>
            )}
        </div>
    );
};

export default Book;
