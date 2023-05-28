const express = require("express");
const route = express.Router();
const {
  register,
  login,
  getAllPatients,
  getPatientProfile,
} = require("../controllers/patient.controller");
const patientAuth = require("../Middleware/patientAuthMiddleware");
const medecinAuth = require("../Middleware/medecinAuthMiddleware");
const {
  getPatientOrdonnances,
} = require("../controllers/ordonnance.controller");
const { getPatientRDVS } = require("../controllers/rdv.controller");
const { getPatientFactures } = require("../controllers/facture.controller");

route.get("/", patientAuth, getPatientProfile);

route.get("/rdvs", patientAuth, getPatientRDVS);
// get all patients
route.get("/all", medecinAuth, getAllPatients);

route.post("/register", register).post("/login", login);

route.get("/ordonnances", patientAuth, getPatientOrdonnances);
route.get("/factures", patientAuth, getPatientFactures);

module.exports = route;
