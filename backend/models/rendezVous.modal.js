const mongoose = require("mongoose");

const RdvSchema = mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  heure: {
    type: String,
    required: true,
  },
  medecinID: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "medecin",
  },
  patientID: {
    type: mongoose.Types.ObjectId,
    ref: "patients",
    required: true,
  },
  typeService: {
    type: String,
    required: true,
  },
});

const RDV = mongoose.model("rendez-vous", RdvSchema);
module.exports = RDV;
