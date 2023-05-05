const asyncHandler = require("express-async-handler");
const Service = require("../models/service.modal");

const SelectService = asyncHandler(async (req, res) => {
  const { type } = req.body;

  if (type) {
    await Service.create({
      type,
      patientId: req.patient,
      personnalId: req.personnal,
    });
  }
});

module.exports = { SelectService };
