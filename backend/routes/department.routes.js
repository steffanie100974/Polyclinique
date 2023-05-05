const express = require("express");
const router = express.Router();
const {
  getAllDepartments,
  createDepartment,
} = require("../controllers/department.controller");

// Route to get all departments
router.get("/", getAllDepartments);
// Route to create a new department
router.post("/", createDepartment);

module.exports = router;
