const asyncHandler = require("express-async-handler");
const RDV = require("../models/rendezVous.modal");

const getRDV = asyncHandler(async (req, res) => {
  const { time } = req.body;

  const rdv = await RDV.create({
    time,
    patientId: req.patient,
    personnalId: req.personnal,
    serviceId: req.service,
  });

  if (rdv) {
    res
      .status(201)
      .json({ msg: `rendez-vous confirmer pour le ${time}`, time });
  } else {
    res.status(400).json({ msg: `une erreur` });
  }
});

const addRDV = asyncHandler(async (req, res) => {
  const { patientID, medecinID, date, heure, typeService } = req.body;
  if (!patientID || !medecinID || !date || !heure || !typeService)
    return res
      .status(400)
      .json({ message: "Les donnés ne sont pas suffisants" });

  try {
    await RDV.create({
      patientID,
      medecinID,
      date,
      heure,
      typeService,
    });
    res.status(201).json({ message: "Rendez-vous pris avec succès" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "something went wrong, couldnt add rendez vous" });
  }
});

const deleteRDV = asyncHandler(async (req, res) => {
  const deletedrdv = await RDV.findOneAndRemove({ patientId: req.patient });

  if (deletedrdv) {
    res.status(200).json({ msg: "rendez-vous supprimé" });
  }
});

module.exports = { getRDV, deleteRDV, addRDV };
