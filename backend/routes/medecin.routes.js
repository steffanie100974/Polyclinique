const express = require("express");
const {
  register,
  login,
  getDepartmentDoctors,
  addDoctor,
  getMedecinFutureRDVS,
  getMedecinPatients,
  addOrdonnance,
  getMedecinOrdonnances,
  deleteOrdonnance,
  getMedecinPastRDVS,
  getMedecinFactures,
  getMedecins,
  deleteDoctor,
  resetMedecinPassword,
  getDoctor,
} = require("../controllers/medecin.controller");
const medecinAuth = require("../Middleware/medecinAuthMiddleware");
const adminAuth = require("../Middleware/adminAuthMiddleware");
const route = express.Router();

// medecins routes that only admins can access
route.get("/", adminAuth, getMedecins);
route.post("/", adminAuth, addDoctor);
route.get("/:id", adminAuth, getDoctor);
route.delete("/:id", adminAuth, deleteDoctor);
route.patch("/:id/reset-password", adminAuth, resetMedecinPassword);

// medecin auth routes
route.post("/register", register).post("/login", login);

// medecin factures routes
route.get("/factures", medecinAuth, getMedecinFactures);

route.get("/departmentDoctors/:departmentID", getDepartmentDoctors);

route.get("/patients", medecinAuth, getMedecinPatients);

// medecin rdvs routes
route.get("/futureAppointments", medecinAuth, getMedecinFutureRDVS);
route.get("/pastAppointments", medecinAuth, getMedecinPastRDVS);

// medecin ordonnances routes
route.post("/ordonnances", medecinAuth, addOrdonnance);
route.get("/ordonnances", medecinAuth, getMedecinOrdonnances);
route.delete("/ordonnances/:_id", medecinAuth, deleteOrdonnance);

module.exports = route;
