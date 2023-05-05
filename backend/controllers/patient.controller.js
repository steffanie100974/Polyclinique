const AsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Patient = require("../models/PatientModal");
const Facture = require("../models/FactureModal");
const RDV = require("../models/rendezVous.modal");
const Medecin = require("../models/MedecinModal");
const Ordonnance = require("../models/OrdonnanceModal");

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

const register = AsyncHandler(async (req, res) => {
  const { firstName, lastName, email, password, CIN, dateOfBirth } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const patientExist = await Patient.findOne({ email });

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
  });
  if (patient) {
    const jsonData = JSON.stringify(patient);
    const parsedMap = JSON.parse(jsonData);
    return res.status(201).json({
      ...parsedMap,
      token: genToken(patient._id),
    });
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

  return res.status(200).json({
    ...patient,
    token: genToken(patient._id),
  });
});

// get patient factures
const getPatientFactures = AsyncHandler(async (req, res) => {
  const { _id: patientID } = req.patient;
  // send request like this: localhost:3001/patient/factures?paid=false to get only unpaid factures, or send localhost:3001/patient/factures to get all factures
  const { paid } = req.query;
  try {
    const patientRDVS = await RDV.find({ patientID });
    if (patientRDVS.length === 0)
      return res.status(404).json({
        message:
          "Vous n'avez aucune facture à payer car vous n'avez pris aucun rendez-vous",
      });
    let patientFactures = [];
    for (let i = 0; i < patientRDVS.length; i++) {
      const { _id, date, typeService, medecinID } = patientRDVS[i];
      const medecin = await Medecin.findById(medecinID);

      let facture;
      if (paid) {
        facture = await Facture.findOne({
          rdvID: _id,
          isPaid: paid,
        });
      } else {
        facture = await Facture.findOne({
          rdvID: _id,
        });
      }
      if (facture) {
        const patientFacture = {
          _id: facture._id,
          date,
          typeService,
          medecinFirstName: medecin.firstName,
          medecinLastName: medecin.lastName,
          price: facture.price,
          deadline: facture.deadline,
        };
        patientFactures.push(patientFacture);
      }
    }

    if (patientFactures.length === 0)
      return res.status(404).json({ message: "Vous avez 0 factures" });

    return res.status(200).json(patientFactures);
  } catch (error) {
    return res.status(500).json(error);
  }
});

// get patient ordonnances
const getPatientOrdonnances = AsyncHandler(async (req, res) => {
  const { _id: patientID } = req.patient;
  try {
    const ordonnances = await Ordonnance.find({ patientID }).populate(
      "medecinID",
      "firstName lastName"
    );

    // let ordonnances;
    // for (let i = 0; i < docs.length; i++) {
    //   const { medecinID, date, description, medicaments } = docs[i];
    //   const medecin = await Medecin.findById(medecinID);
    //   const ordonnance = {
    //     date,
    //     description,
    //     medicaments,
    //     medecinFirstName: medecin.firstName,
    //     medecinLastName: medecin.lastName,
    //   };
    //   ordonnances.push(ordonnance);
    // }
    res.status(200).json(ordonnances);
  } catch (error) {
    res.status(500).json(error);
  }
});
const restorePassword = AsyncHandler(async (req, res) => {});

const genToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};
module.exports = {
  register,
  login,
  getPatientFactures,
  getPatientOrdonnances,
  getAllPatients,
};
