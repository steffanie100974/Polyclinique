const Department = require("../models/DepartmentModal");

const getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    res.json(departments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createDepartment = async (req, res) => {
  const department = new Department({
    name: req.body.name,
    image: req.body.image,
    // add any other required fields here
  });

  try {
    const newDepartment = await department.save();
    res.status(201).json(newDepartment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { getAllDepartments, createDepartment };

// api get doctors by department name
