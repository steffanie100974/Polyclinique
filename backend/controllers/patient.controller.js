const AsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Patient = require("../models/PatientModal");
const Facture = require("../models/FactureModal");
const RDV = require("../models/rendezVous.modal");
const Medecin = require("../models/MedecinModal");
const Ordonnance = require("../models/OrdonnanceModal");

const getMedecinPatients = AsyncHandler(async (req, res) => {
  const { _id: medecinID } = req.medecin;

  const now = new Date(); // get current date and time

  const medecinRDVS = await RDV.aggregate([
    { $match: { medecinID } }, // filter by medecinID
    {
      $group: {
        _id: "$patientID", // group by patientID
        rdvs: {
          $push: {
            _id: "$_id",
            date: "$date",
            heure: "$heure",
            typeService: "$typeService",
          },
        },
      },
    },
    {
      $project: {
        rdvs: { $slice: ["$rdvs", -1] }, // select only the latest appointment
      },
    },
    {
      $lookup: {
        from: "patients",
        localField: "_id",
        foreignField: "_id",
        as: "patient",
      },
    }, // join with patients collection
    { $unwind: "$patient" }, // destructure patient array
    // { $match: { "rdvs.date": { $lte: new Date() } } }, // filter out appointments that have not yet occurred
    { $sort: { "rdvs.date": -1 } }, // sort rdvs array by date in descending order
  ]);

  console.log("medecin rdvs", medecinRDVS);

  const patients = medecinRDVS.map(({ patient, rdvs }) => {
    console.log("rdvs", rdvs);
    return {
      patient,
      rdv: rdvs[0],
    };
  });
  // rename rdvs to rdv

  console.log("patients", patients);

  res.status(200).json(patients);
});
// get all patients
const getAllPatients = AsyncHandler(async (req, res) => {
  try {
    const patients = await Patient.find();
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json(error);

    console.log("errorr", error);
  }
});

// get patient profile

const getPatientProfile = (req, res) => {
  return res.status(200).json(req.patient);
};

const register = AsyncHandler(async (req, res) => {
  const { firstName, lastName, email, password, CIN, dateOfBirth, phone } =
    req.body;

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const patientExist = await Patient.findOne({ email, phone });

  if (patientExist) {
    return res.status(409).json({ message: "Patient Already Exist" });
  }

  const patient = await Patient.create({
    firstName,
    lastName,
    email,
    password: hashPassword,
    CIN,
    dateOfBirth,
    phone,
  });
  if (patient) {
    const token = genToken(patient._id);
    return res.status(201).json(token);
  }
});

const login = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const patient = await Patient.findOne({ email })?.lean();
  if (!patient) {
    return res
      .status(404)
      .json({ message: "Aucun patient n'existe avec cet email" });
  }

  const matchingPassword = await bcrypt.compare(password, patient.password);
  if (!matchingPassword)
    return res.status(401).json({ message: "Mot de passe incorrect" });

  const token = genToken(patient._id);
  return res.status(200).json(token);
});

const restorePassword = AsyncHandler(async (req, res) => {});

const genToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};
module.exports = {
  register,
  login,
  getAllPatients,
  getMedecinPatients,
  getPatientProfile,
};
