// ESM version: patient.controller.js

import Patient from "../models/Patient.js";

export const createPatient = async (req, res) => {
  try {
    const newPatient = new Patient(req.body);
    await newPatient.save();
    res.status(201).json(newPatient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPatients = async (req, res) => {
  try {
    const patients = await Patient.find().populate("user");
    res.json(patients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
