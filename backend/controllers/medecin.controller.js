const AsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Medecin = require("../models/MedecinModal");
const Facture = require("../models/FactureModal");
const Ordonnance = require("../models/OrdonnanceModal");
const RDV = require("../models/rendezVous.modal");

// ------------------> MEDECIN AUTH CONTROLLERS
const register = AsyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    phone,
    permanent,
    speciality,
    salary,
    dateOfBirth,
    department,
  } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const medecinExist = await Medecin.findOne({ email });

  if (medecinExist) {
    res.status(200).json({ msg: "Medecin Already Exist" });
  }

  const medecin = await Medecin.create({
    firstName,
    lastName,
    email,
    password: hashPassword,
    dateOfBirth,
    phone,
    permanent,
    speciality,
    salary,
    department,
  });

  if (medecin) {
    res.status(201).json({
      Medecin: {
        id: medecin._id,
        firstName,
        lastName,
        email,
        CIN,
        date_of_born,
        phone,
      },
      msg: "Medecin registered",
    });
  }
});

const login = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const medecin = await Medecin.findOne({ email })?.lean();
  if (!medecin) {
    return res
      .status(404)
      .json({ message: "Aucun medecin n'existe avec cet email" });
  }

  const matchingPassword = await bcrypt.compare(password, medecin.password);
  if (!matchingPassword)
    return res.status(401).json({ message: "Mot de passe incorrect" });

  return res.status(200).json({
    ...medecin,
    token: genToken(medecin._id),
  });
});

// ------------------> END OF  MEDECIN AUTH CONTROLLERS

// -----------------> MEDECIN ORDONNANCES CONTROLLERS
// ajouter une ordonnance
const addOrdonnance = AsyncHandler(async (req, res) => {
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
      medecinID,
      patientID,
      description,
      medicaments,
    });
    const populatedOrdonnance = await ordonnance.populate(
      "patientID",
      "lastName firstName"
    );
    res.status(201).json(populatedOrdonnance);
  } catch (error) {
    console.log("erooor", error);
    res.status(500).json(error);
  }
});

// get medecin ordonnances
const getMedecinOrdonnances = AsyncHandler(async (req, res) => {
  const { _id: medecinID } = req.medecin;
  console.log("api hit");
  try {
    const ordonnances = await Ordonnance.find({ medecinID }).populate(
      "patientID",
      "lastName firstName"
    );

    res.status(200).json(ordonnances);
  } catch (error) {
    console.log("eroor", error);
    res.status(500).json(error);
  }
});

// delete ordonnance
const deleteOrdonnance = AsyncHandler(async (req, res) => {
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
});

// -----------------> END OF MEDECIN ORDONNANCES CONTROLLERS

// -----------------> MEDECIN FACTURES CONTROLLERS

const getMedecinFactures = AsyncHandler(async (req, res) => {
  const { _id: medecinID } = req.medecin;
  try {
    const factures = await Facture.find()
      .populate({
        path: "rdvID",
        select: "patientID medecinID",
        populate: {
          path: "patientID",
          select: "firstName lastName",
        },
      })
      .exec();

    console.log("factuuress", factures);
    const filteredFactures = factures
      .filter(
        (facture) => facture.rdvID.medecinID.toString() === medecinID.toString()
      )
      .map((facture) => {
        return {
          _id: facture._id,
          price: facture.price,
          isPaid: facture.isPaid,
          deadline: facture.deadline,
          rdv: { _id: facture.rdvID._id, patientID: facture.rdvID.patientID },
          createdAt: facture.createdAt,
        };
      });

    console.log("filtered factures", filteredFactures);
    res.status(200).json(filteredFactures);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Server error" });
  }
});
// -----------------> END OF MEDECIN FACTURES CONTROLLERS

// -----------------> MEDECIN RDVS CONTROLLERS
const getMedecinFutureRDVS = AsyncHandler(async (req, res) => {
  const { _id: medecinID } = req.medecin;
  try {
    const futureRDVS = await RDV.find({
      medecinID: medecinID,
      date: { $gte: new Date() },
    }).populate("patientID", "lastName firstName");
    if (futureRDVS.length === 0)
      return res.status(404).json({ message: "Vous n'avez aucun RDV à venir" });

    return res.status(200).json(futureRDVS);
  } catch (error) {
    console.log("erroor", error);
    return res.status(500).json(error);
  }
});
const getMedecinPastRDVS = AsyncHandler(async (req, res) => {
  const { _id: medecinID } = req.medecin;
  try {
    const rdvs = await RDV.find({
      medecinID: medecinID,
      date: { $lte: new Date() },
    }).populate("patientID", "lastName firstName");

    return res.status(200).json(rdvs);
  } catch (error) {
    console.log("error past rdvs: ", error);
    return res.status(500).json({ message: "server error" });
  }
});

// -----------------> END OF MEDECIN RDVS CONTROLLERS

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

const getDepartmentDoctors = AsyncHandler(async (req, res) => {
  const { departmentID } = req.params;

  const doctors = await Medecin.find({ department: departmentID });
  return res.status(200).json(doctors);
});

// ----------------------------> MEDECIN CONTROLLERS THAT CAN BE ACCESSED ONLY BY ADMINS
// add doctor
const addDoctor = AsyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    phone,
    permanent,
    speciality,
    salary,
    department,
    dateOfBirth,
  } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const medecinExist = await Medecin.findOne({ email });

    if (medecinExist) {
      res.status(400).json({ message: "Medecin deja existe" });
    }

    const addedDoctor = await Medecin.create({
      firstName,
      lastName,
      email,
      password: hashPassword,
      dateOfBirth,
      phone,
      permanent,
      speciality,
      salary,
      department,
    });

    return res.status(201).json({ message: "Medecin ajouté avec success" });
  } catch (error) {
    console.log("error add doctor", error);
    res.status(500).json({ message: "Server error" });
  }
});
// delete doctor
const deleteDoctor = AsyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    await Medecin.findByIdAndDelete(id);
    res.status(200).json({ message: "Medecin supprimé avec success" });
  } catch (error) {
    console.log("error delete doctor", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// reset password
const resetMedecinPassword = AsyncHandler(async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    await Medecin.findByIdAndUpdate(id, { password: hashedPassword });
    res.status(200).json({
      message: "Le mot de passe du médecin a été réinitialisé avec succès",
    });
  } catch (error) {
    console.log("error reset medecin password", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// get all medecins
const getMedecins = AsyncHandler(async (req, res) => {
  try {
    const medecins = await Medecin.find().populate("department", "name");
    if (medecins.length == 0)
      return res.status(404).json({ message: "No medecins found" });
    res.status(200).json(medecins);
  } catch (error) {
    console.log("error get medecins", error);
    res.status(500).json({ message: "Server error" });
  }
});

const getDoctor = AsyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const doctor = await Medecin.findById(id)?.populate("department", "name");
    if (!doctor)
      return res.status(404).json({
        message: `Aucun médecin n'existe avec cet identifiant: ${id}`,
      });
    res.status(200).json(doctor);
  } catch (error) {
    console.log("error get doctor", error);
    res.status(500).json({ message: "Server Error" });
  }
});
// ----------------------------> END OF MEDECIN CONTROLLERS THAT CAN BE ACCESSED ONLY BY ADMINS

const genToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};
module.exports = {
  register,
  login,
  getDepartmentDoctors,
  addDoctor,
  getMedecinFutureRDVS,
  getMedecinPatients,
  addOrdonnance,
  getMedecinOrdonnances,
  deleteOrdonnance,
  getMedecinPastRDVS,
  getMedecinFactures,
  getMedecins,
  deleteDoctor,
  resetMedecinPassword,
  getDoctor,
};
