const express = require("express");
const {
  getRDV,
  deleteRDV,
  addRDV,
  getMedecinFutureRDVS,
  getMedecinRDVS,
  getAllRDVS,
} = require("../controllers/rdv.controller");
const patientAuth = require("../Middleware/patientAuthMiddleware");
const medecinAuth = require("../Middleware/medecinAuthMiddleware");
const adminAuth = require("../Middleware/adminAuthMiddleware");
const route = express.Router();

route.get("/all", adminAuth, getAllRDVS);

route.post("/", patientAuth, addRDV);
route.delete("/:id", deleteRDV);

route.get("/medecin", medecinAuth, getMedecinRDVS);

route.get("/medecin/future", medecinAuth, getMedecinFutureRDVS);
route.get("/medecin/:idDoctor", adminAuth, getMedecinRDVS);

module.exports = route;
