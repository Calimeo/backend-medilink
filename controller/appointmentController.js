import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { Appointment } from "../models/appointmentSchema.js";
import { User } from "../models/userSchema.js";

import { Appointment } from "../models/appointmentModel.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";

export const postAppointment = catchAsyncErrors(async (req, res) => {
  const {
    firstName, lastName, email, phone, nic, dob,
    gender, appointment_date, department,
    doctor_firstName, doctor_lastName, hasVisited, address
  } = req.body;

  if (
    !firstName || !lastName || !email || !phone || !nic || !dob ||
    !gender || !appointment_date || !department ||
    !doctor_firstName || !doctor_lastName || !address
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const appointment = await Appointment.create({
    firstName, lastName, email, phone, nic, dob,
    gender, appointment_date, department,
    doctor_firstName, doctor_lastName, hasVisited, address
  });

  res.status(201).json({ message: "Appointment created successfully", appointment });
});


export const getAllAppointments = catchAsyncErrors(async (req, res, next) => {
  const appointments = await Appointment.find();
  res.status(200).json({
    success: true,
    appointments,
  });
});
export const updateAppointmentStatus = catchAsyncErrors(
  async (req, res, next) => {
    const { id } = req.params;
    let appointment = await Appointment.findById(id);
    if (!appointment) {
      return next(new ErrorHandler("Appointment not found!", 404));
    }
    appointment = await Appointment.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    res.status(200).json({
      success: true,
      message: "Appointment Status Updated!",
    });
  }
);
export const deleteAppointment = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const appointment = await Appointment.findById(id);
  if (!appointment) {
    return next(new ErrorHandler("Appointment Not Found!", 404));
  }
  await appointment.deleteOne();
  res.status(200).json({
    success: true,
    message: "Appointment Deleted!",
  });
});

export const getAppointmentsByPatient = catchAsyncErrors(async (req, res, next) => {
  const patientId = req.user._id;

  const appointments = await Appointment.find({ patientId });

  res.status(200).json({
    success: true,
    appointments,
  });
});

export const deleteAppointmentByPatient = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const patientId = req.user._id;

  const appointment = await Appointment.findById(id);

  if (!appointment) {
    return next(new ErrorHandler("Appointment not found", 404));
  }

  if (appointment.patientId.toString() !== patientId.toString()) {
    return next(new ErrorHandler("Not authorized to delete this appointment", 403));
  }

  await appointment.deleteOne();

  res.status(200).json({
    success: true,
    message: "Appointment cancelled successfully",
  });
});


export const getDoctorAppointments = async (req, res) => {
  try {
    const doctorId = req.query.doctorId; // ou req.params.doctorId si tu préfères

    if (!doctorId) {
      return res.status(400).json({ success: false, message: "doctorId est requis." });
    }

    const appointments = await Appointment.find({ doctor: doctorId });

    res.status(200).json({ success: true, appointments });
  } catch (error) {
    res.status(500).json({ success: false, message: "Erreur serveur", error: error.message });
  }
};

