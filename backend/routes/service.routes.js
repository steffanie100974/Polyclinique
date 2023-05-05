const express = require("express");
const { SelectService } = require("../controllers/service.controller");
const route = express.Router();

route.post("/", SelectService);

module.exports = route;
