import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  nic: { type: String, required: true },
  dob: { type: Date, required: true },
  gender: { type: String, enum: ["Male", "Female"], required: true },
  appointment_date: { type: Date, required: true },
  department: { type: String, required: true },
  doctor_firstName: { type: String, required: true },
  doctor_lastName: { type: String, required: true },
  hasVisited: { type: Boolean, default: false },
  address: { type: String, required: true },
}, {
  timestamps: true,
});

export const Appointment = mongoose.model("Appointment", appointmentSchema);
