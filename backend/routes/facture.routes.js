const express = require("express");
const {
  postFacture,
  deleteFacture,
} = require("../controllers/facture.controller");
const medecinAuth = require("../Middleware/medecinAuthMiddleware");
const route = express.Router();

route.post("/", medecinAuth, postFacture);
route.delete("/:_id", medecinAuth, deleteFacture);

module.exports = route;
