const mongoose = require("mongoose");

const serviceSchema = mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  frais: {
    type: Number,
  },
  patientId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
});

const Service = mongoose.model("service", serviceSchema);
module.exports = Service;
