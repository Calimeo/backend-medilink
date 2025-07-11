import express from "express";
import {
  deleteAppointment,
  getAllAppointments,
  postAppointment,
  updateAppointmentStatus,
  getAppointmentsByPatient,
  deleteAppointmentByPatient,
  getDoctorAppointments,
} from "../controller/appointmentController.js";
import {
  isAuthenticated,
  isAuthorized,
} from "../middlewares/auth.js";

const router = express.Router();

router.post("/post", isAuthenticated, postAppointment);
router.get("/getall",  getAllAppointments);
router.put("/update/:id" ,isAuthenticated, updateAppointmentStatus);
router.delete("/delete/:id", isAuthenticated, deleteAppointment);
router.get("/patient", isAuthenticated, getAppointmentsByPatient);
router.delete("/:id", isAuthenticated, deleteAppointmentByPatient);
router.get("/rdv/:userId", isAuthenticated, isAuthorized("Doctor"), getDoctorAppointments);


export default router;
