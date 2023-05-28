const express = require("express");
const {
  getRDV,
  deleteRDV,
  addRDV,
  getMedecinFutureRDVS,
  getMedecinRDVS,
} = require("../controllers/rdv.controller");
const patientAuth = require("../Middleware/patientAuthMiddleware");
const medecinAuth = require("../Middleware/medecinAuthMiddleware");
const route = express.Router();

route.post("/", patientAuth, addRDV);
route.delete("/:id", deleteRDV);

route.get("/medecin", medecinAuth, getMedecinRDVS);
route.get("/medecin/future", medecinAuth, getMedecinFutureRDVS);
module.exports = route;
