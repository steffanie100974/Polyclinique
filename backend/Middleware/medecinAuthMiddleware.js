const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const Medecin = require("../models/MedecinModal");

const medecinAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!mongoose.Types.ObjectId.isValid(decoded.id)) {
      throw new Error("Invalid token");
    }
    const medecin = await Medecin.findById(decoded.id).select("-password");

    if (!medecin) {
      throw new Error("Invalid token");
    }

    if (decoded.exp < Date.now() / 1000) {
      throw new Error("Token expired");
    }
    req.medecin = medecin;
    next();
  } catch (error) {
    console.log("error", error);

    let statusCode = 401;
    let errorMessage = "Please authenticate.";

    if (error.message === "Invalid token") {
      statusCode = 401;
      errorMessage = "Invalid token.";
    } else if (error.message === "Token expired") {
      statusCode = 403;
      errorMessage = "Token expired.";
    }

    res.status(statusCode).send({ error: errorMessage });
  }
};

module.exports = medecinAuth;
