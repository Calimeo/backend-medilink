// ESM version: patient.routes.js

import express from 'express';
import {
  createPatient,
  getPatients,
  // getPatientById,
  // updatePatient,
  // deletePatient,
  // loginPatient
} from '../controller/patient.controller.js';

const router = express.Router();

// Inscription et connexion
router.post('/register', createPatient);
// router.post('/login', loginPatient);

// Gestion des patients
router.get('/', getPatients);
// router.get('/:id', getPatientById);
// router.put('/:id', updatePatient);
// router.delete('/:id', deletePatient);

export default router;
