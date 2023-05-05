const express = require("express");
const {
  register,
  login,
  getPatientFactures,
  getPatientOrdonnances,
  getAllPatients,
} = require("../controllers/patient.controller");
const patientAuth = require("../Middleware/patientAuthMiddleware");
const medecinAuth = require("../Middleware/medecinAuthMiddleware");
const route = express.Router();

// get all patients
route.get("/", medecinAuth, getAllPatients);

route.post("/register", register).post("/login", login);

route.get("/factures", patientAuth, getPatientFactures);
route.get("/ordonnances", patientAuth, getPatientOrdonnances);

module.exports = route;
