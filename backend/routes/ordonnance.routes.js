const express = require("express");
const medecinAuth = require("../Middleware/medecinAuthMiddleware");
const {
  deleteOrdonnance,
  getMedecinOrdonnances,
} = require("../controllers/ordonnance.controller");
const route = express.Router();

route.delete("/:_id", medecinAuth, deleteOrdonnance);
route.get("/medecin", medecinAuth, getMedecinOrdonnances);

module.exports = route;
