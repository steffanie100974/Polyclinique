const express = require("express");
const {
  getAllMedecins,
  adminLogin,
  createAdmin,
} = require("../controllers/admin.controller");
const router = express.Router();

router.post("/login", adminLogin);
router.post("/create", createAdmin);

module.exports = router;
