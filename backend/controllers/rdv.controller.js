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
  const { medecinID, date, hour } = req.body;
  if (!medecinID || !date || !hour) {
    return res
      .status(400)
      .json({ message: "Les données ne sont pas suffisantes" });
  }

  const { _id: patientID } = req.patient;

  try {
    // Check if there is already a rendezvous at the requested hour on the requested day
    const existingRDV = await RDV.findOne({ medecin: medecinID, date, hour });
    if (existingRDV) {
      return res
        .status(400)
        .json({ message: "La plage horaire demandée est déjà réservée" });
    }

    await RDV.create({
      patient: patientID,
      medecin: medecinID,
      date: new Date(date).toISOString(), // Convert the date to a string in ISO format
      hour,
    });

    res.status(201).json({ message: "Rendez-vous pris avec succès" });
  } catch (error) {
    res.status(500).json(error);
  }
});

const deleteRDV = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deletedrdv = await RDV.findByIdAndDelete(id);

  if (deletedrdv) {
    res.status(200).json({ msg: "rendez-vous supprimé" });
  }
});

const getMedecinFutureRDVS = async (req, res) => {
  const { _id: medecinID } = req.medecin;
  try {
    const futureRDVS = await RDV.find({
      medecin: medecinID,
      date: { $gte: new Date() },
    }).populate("patient", "lastName firstName");

    return res.status(200).json(futureRDVS);
  } catch (error) {
    console.log("erroor", error);
    return res.status(500).json(error);
  }
};
const getMedecinRDVS = async (req, res) => {
  const { _id: medecinID } = req.medecin;
  try {
    const rdvs = await RDV.find({
      medecin: medecinID,
    }).populate("patient", "lastName firstName phone");

    return res.status(200).json(rdvs);
  } catch (error) {
    console.log("erroor", error);
    return res.status(500).json(error);
  }
};
const getPatientRDVS = async (req, res) => {
  const { _id: patientID } = req.patient;
  try {
    const rdvs = await RDV.find({
      patient: patientID,
    })
      .populate("medecin", "lastName firstName")
      .sort({ date: -1 });

    return res.status(200).json(rdvs);
  } catch (error) {
    console.log("erroor", error);
    return res.status(500).json(error);
  }
};

module.exports = {
  getRDV,
  deleteRDV,
  addRDV,
  getMedecinFutureRDVS,
  getMedecinRDVS,
  getPatientRDVS,
};
