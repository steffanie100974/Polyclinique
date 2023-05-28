const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const Medecin = require("../models/MedecinModal");

const medecinAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!mongoose.Types.ObjectId.isValid(decoded.id)) {
      return res.status(400).json({ message: "Invalid Token" });
    }
    const medecin = await Medecin.findById(decoded.id).select("-password");

    if (!medecin) {
      return res.status(400).json({ message: "The token provided is invalid" });
    }
    req.medecin = medecin;
    next();
  } catch (error) {
    console.log("error my medecin auth", error);
    res.status(400).json({ error: error.message });
  }
};

module.exports = medecinAuth;
