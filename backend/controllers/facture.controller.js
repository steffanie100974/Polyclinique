const AsyncHandler = require("express-async-handler");
const Facture = require("../models/FactureModal");
const RDV = require("../models/rendezVous.modal");

// post facture
const postFacture = AsyncHandler(async (req, res) => {
  try {
    const facture = await Facture.create(req.body);
    res.status(201).json(facture);
  } catch (error) {
    console.log("eroor facture ", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// delete ordonnance
const deleteFacture = AsyncHandler(async (req, res) => {
  const { _id } = req.params;
  try {
    const deletedFacture = await Facture.findByIdAndDelete(_id);
    if (deletedFacture) {
      res.status(200).json({ message: "Facture deleted successfully" });
    } else {
      res.status(404).json({ message: "Facture not found" });
    }
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Server error" });
  }
});

// get patient factures
const getPatientFactures = AsyncHandler(async (req, res) => {
  console.log("api hit");
  const { _id: patientID } = req.patient;
  const { isPaid } = req.query;
  const queryFilter =
    isPaid === undefined
      ? {
          rdv: { $in: await RDV.find({ patient: patientID }) },
        }
      : {
          isPaid,
          rdv: { $in: await RDV.find({ patient: patientID }) },
        };
  try {
    const factures = await Facture.find(queryFilter)
      // .populate("rdv", "-factures") // Populate the RDV field excluding the factures
      // .populate("rdv.medecin")
      .populate({
        path: "rdv",
        select: "-factures",
        populate: {
          path: "medecin",
          select: "firstName lastName",
        },
      }) // Populate the medecin field of the RDV
      .sort({ createdAt: -1 });
    return res.json(factures);
  } catch (error) {
    console.log("error get factures", error);
    return res.status(500).json(error);
  }
});
const getDoctorFactures = AsyncHandler(async (req, res) => {
  console.log("api hit");
  const { _id: medecinID } = req.medecin;

  try {
    const factures = await Facture.find({
      rdv: { $in: await RDV.find({ medecin: medecinID }) },
    })
      // .populate("rdv", "-factures") // Populate the RDV field excluding the factures
      // .populate("rdv.medecin")
      .populate({
        path: "rdv",
        select: "-factures",
        populate: {
          path: "patient",
          select: "firstName lastName phone",
        },
      }) // Populate the medecin field of the RDV
      .sort({ createdAt: -1 });
    return res.json(factures);
  } catch (error) {
    console.log("error get doctor factures", error);
    return res.status(500).json(error);
  }
});

const updateFacture = async (req, res) => {
  const { factureID } = req.params;
  try {
    const updatedFacture = await Facture.findByIdAndUpdate(factureID, req.body);
    res.status(200).json(updatedFacture);
  } catch (error) {
    console.log("error update facture", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  postFacture,
  deleteFacture,
  getPatientFactures,
  getDoctorFactures,
  updateFacture,
};
