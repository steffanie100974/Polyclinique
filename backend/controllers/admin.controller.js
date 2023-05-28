const Admin = require("../models/AdminModal");
const Medecin = require("../models/MedecinModal");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const createAdmin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    await Admin.create({
      email,
      password: hashPassword,
    });
    res.status(201).json({ message: "Admin created successfully" });
  } catch (error) {
    console.log("error create admin", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getAllMedecins = async (req, res) => {
  try {
    const medecins = await Medecin.find();
    if (medecins.length == 0)
      return res.status(404).json({ message: "Aucun médecin trouvé" });
    res.status(200).json(medecins);
  } catch (error) {
    console.log("error get medecins", error);
    res.status(500).json({ message: "Server error" });
  }
};
const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email })?.lean();
  if (!admin) {
    return res
      .status(404)
      .json({ message: "Aucun admin n'existe avec cet email" });
  }

  const matchingPassword = await bcrypt.compare(password, admin.password);
  if (!matchingPassword)
    return res.status(401).json({ message: "Mot de passe incorrect" });

  const token = genToken(admin._id);
  return res.status(200).json(token);
};

const genToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

module.exports = { getAllMedecins, adminLogin, createAdmin };
