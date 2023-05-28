const mongoose = require("mongoose");

const patientSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    CIN: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);

const Patient = mongoose.model("patients", patientSchema);

module.exports = Patient;
