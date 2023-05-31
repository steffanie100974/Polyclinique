const express = require("express");
const {
  postFacture,
  deleteFacture,
  getFacture,
  getAllFactures,
} = require("../controllers/facture.controller");
const medecinAuth = require("../Middleware/medecinAuthMiddleware");
const authMiddleware = require("../Middleware/authMiddleware");
const adminAuth = require("../Middleware/adminAuthMiddleware");
const route = express.Router();

route.get("/", adminAuth, getAllFactures);

route.get("/:factureID", authMiddleware, getFacture);

route.post("/", medecinAuth, postFacture);
route.delete("/:_id", medecinAuth, deleteFacture);

module.exports = route;
