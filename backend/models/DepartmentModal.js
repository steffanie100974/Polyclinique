const mongoose = require("mongoose");

const departmentSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const Department = mongoose.model("departements", departmentSchema);

module.exports = Department;
