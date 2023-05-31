const express = require("express");
const {
  register,
  login,
  getDepartmentDoctors,
  addDoctor,
  getMedecinPastRDVS,
  getMedecins,
  deleteDoctor,
  resetMedecinPassword,
  getDoctor,
  getDoctorProfile,
  updateDoctorProfile,
} = require("../controllers/medecin.controller");
const medecinAuth = require("../Middleware/medecinAuthMiddleware");
const adminAuth = require("../Middleware/adminAuthMiddleware");
const {
  getMedecinPatients,
  getAllPatients,
} = require("../controllers/patient.controller");
const {
  getDoctorFactures,
  updateFacture,
} = require("../controllers/facture.controller");
const { addOrdonnance } = require("../controllers/ordonnance.controller");
const route = express.Router();

route.get("/", medecinAuth, getDoctorProfile);
route.put("/", medecinAuth, updateDoctorProfile);

route.get("/patients", medecinAuth, getAllPatients);

// medecin auth routes
route.post("/register", register);
route.post("/login", login);

// medecin profile routes

// medecin factures routes
route.get("/factures", medecinAuth, getDoctorFactures);
route.put("/factures/:factureID", medecinAuth, updateFacture);

// medecin departments rotues
route.get("/department/:departmentID", getDepartmentDoctors);

// medecin rdvs routes
route.get("/pastAppointments", medecinAuth, getMedecinPastRDVS);

// medecin ordonnances routes
route.post("/ordonnances", medecinAuth, addOrdonnance);

// medecins routes that only admins can access
route.get("/all", adminAuth, getMedecins);

route.post("/all", adminAuth, addDoctor);
route.get("/all/:id", adminAuth, getDoctor);
route.delete("/all/:id", adminAuth, deleteDoctor);
route.patch("/all/:id/reset-password", adminAuth, resetMedecinPassword);

module.exports = route;
