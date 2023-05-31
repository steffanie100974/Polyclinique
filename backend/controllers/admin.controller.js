const Admin = require("../models/AdminModal");
const Medecin = require("../models/MedecinModal");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const genToken = require("../utils/genToken");

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

const getAdminProfile = async (req, res) => {
  console.log("api admin profile hit");
  return res.status(200).json(req.admin);
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

  const token = genToken(admin._id, "admin");
  return res.status(200).json(token);
};

const updateAdminProfile = async (req, res) => {
  const { email, currentPassword, newPassword } = req.body;
  const { _id: adminID } = req.admin;

  try {
    let admin = await Admin.findById(adminID);

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Update email profile field
    admin.email = email;

    if (currentPassword && newPassword) {
      // Password change requested
      const isPasswordMatch = await bcrypt.compare(
        currentPassword,
        admin.password
      );

      if (!isPasswordMatch) {
        return res
          .status(400)
          .json({ message: "Mot de passe actuel incorrect" });
      }

      // Hash and update the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      admin.password = hashedPassword;
    }

    // Save the updated admin profile
    admin = await admin.save();

    return res.json({ message: "Compte mis à jour avec succès", admin });
  } catch (error) {
    console.log("Error updating profile:", error);
    return res.status(500).json({
      message: "Une erreur s'est produite lors de la mise à jour du compte",
    });
  }
};

module.exports = {
  adminLogin,
  createAdmin,
  getAdminProfile,
  updateAdminProfile,
};
