const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const Admin = require("../models/AdminModal");

const adminAuth = async (req, res, next) => {
  try {
    console.log("authorization", req.headers.authorization);
    if (!req.headers.authorization)
      return res
        .status(401)
        .json({ message: "Please send token with request" });

    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!mongoose.Types.ObjectId.isValid(decoded.id)) {
      throw new Error("Invalid token");
    }
    const admin = await Admin.findById(decoded.id).select("-password");

    if (!admin) {
      throw new Error("Invalid token");
    }

    if (decoded.exp < Date.now() / 1000) {
      throw new Error("Token expired");
    }
    req.admin = admin;
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

module.exports = adminAuth;
