// ESM version: Patient.js

import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  dateNaissance: { type: Date },
  adresse: { type: String },
  sexe: { type: String, enum: ["Homme", "Femme"] },
  groupeSanguin: { type: String },
  historiqueMedical: { type: String }
}, { timestamps: true });

export default mongoose.model("Patient", patientSchema);
