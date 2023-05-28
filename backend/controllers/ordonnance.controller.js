const Ordonnance = require("../models/OrdonnanceModal");

// get patient ordonnances
const getPatientOrdonnances = async (req, res) => {
  const { _id: patientID } = req.patient;
  console.log("get ordonnances hit");
  try {
    const ordonnances = await Ordonnance.find({ patient: patientID })
      .populate("medecin", "firstName lastName")
      .sort({ date: -1 });

    res.status(200).json(ordonnances);
  } catch (error) {
    console.log("error ordonnances", error);
    res.status(500).json(error);
  }
};

// get medecin ordonnances
const getMedecinOrdonnances = async (req, res) => {
  const { _id: medecinID } = req.medecin;
  console.log("api hit");
  try {
    const ordonnances = await Ordonnance.find({ medecin: medecinID })
      .populate("patient", "lastName firstName")
      .sort({ date: -1 });

    res.status(200).json(ordonnances);
  } catch (error) {
    console.log("eroor", error);
    res.status(500).json(error);
  }
};

// ajouter une ordonnance
const addOrdonnance = async (req, res) => {
  console.log("api hit");
  const { _id: medecinID } = req.medecin;
  const { patientID, description, medicaments } = req.body;

  if (!patientID)
    return res
      .status(400)
      .json({ message: "L'identifiant du patient est obligatoire" });
  if (!medicaments)
    return res
      .status(400)
      .json({ message: "Les medicaments sonts obligatoires" });
  try {
    const ordonnance = await Ordonnance.create({
      medecin: medecinID,
      patient: patientID,
      description,
      medicaments,
    });
    const populatedOrdonnance = await ordonnance.populate(
      "patient",
      "lastName firstName"
    );
    res.status(201).json(populatedOrdonnance);
  } catch (error) {
    console.log("erooor", error);
    res.status(500).json(error);
  }
};
// delete ordonnance
const deleteOrdonnance = async (req, res) => {
  const { _id } = req.params;
  try {
    const deletedOrdonnance = await Ordonnance.findByIdAndDelete(_id);
    if (deletedOrdonnance) {
      res.status(200).json({ message: "Ordonnance deleted successfully" });
    } else {
      res.status(404).json({ message: "Ordonnance not found" });
    }
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getPatientOrdonnances,
  deleteOrdonnance,
  getMedecinOrdonnances,
  addOrdonnance,
};
