const express = require("express");
const { getRDV, deleteRDV, addRDV } = require("../controllers/rdv.controller");
const route = express.Router();

route.post("/", addRDV).delete("/", deleteRDV);

module.exports = route;
