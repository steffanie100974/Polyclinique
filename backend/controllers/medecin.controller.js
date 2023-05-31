const AsyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const Medecin = require("../models/MedecinModal");
const RDV = require("../models/rendezVous.modal");
const genToken = require("../utils/genToken");

const updateDoctorProfile = async (req, res) => {
  const { firstName, lastName, email, phone, currentPassword, newPassword } =
    req.body;
  const { _id: medecinID } = req.medecin;

  try {
    let medecin = await Medecin.findById(medecinID);

    if (!medecin) {
      return res.status(404).json({ message: "Medecin not found" });
    }

    // Update basic profile fields
    medecin.firstName = firstName;
    medecin.lastName = lastName;
    medecin.email = email;
    medecin.phone = phone;

    if (currentPassword && newPassword) {
      // Password change requested
      const isPasswordMatch = await bcrypt.compare(
        currentPassword,
        medecin.password
      );

      if (!isPasswordMatch) {
        return res
          .status(400)
          .json({ message: "Mot de passe actuel incorrect" });
      }

      // Hash and update the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      medecin.password = hashedPassword;
    }

    // Save the updated medecin profile
    medecin = await medecin.save();

    return res.json({ message: "Profil mis à jour avec succès", medecin });
  } catch (error) {
    console.log("Error updating profile:", error);
    return res.status(500).json({
      message: "Une erreur s'est produite lors de la mise à jour du profil",
    });
  }
};

const getDoctorProfile = AsyncHandler(async (req, res) => {
  return res.status(200).json(req.medecin);
});

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

  const token = genToken(medecin._id, "medecin");
  return res.status(200).json(token);
});

// ------------------> END OF  MEDECIN AUTH CONTROLLERS

// -----------------> MEDECIN ORDONNANCES CONTROLLERS

// -----------------> END OF MEDECIN ORDONNANCES CONTROLLERS

// -----------------> MEDECIN FACTURES CONTROLLERS

// -----------------> END OF MEDECIN FACTURES CONTROLLERS

// -----------------> MEDECIN RDVS CONTROLLERS

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

const getDepartmentDoctors = AsyncHandler(async (req, res) => {
  const { departmentID } = req.params;
  console.log("department id", departmentID);

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
    const medecins = await Medecin.find().populate("department");
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

module.exports = {
  register,
  login,
  getDepartmentDoctors,
  addDoctor,
  getMedecinPastRDVS,
  getMedecins,
  deleteDoctor,
  resetMedecinPassword,
  getDoctor,
  getDoctorProfile,
  updateDoctorProfile,
};
