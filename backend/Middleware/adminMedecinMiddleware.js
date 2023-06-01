const jwt = require("jsonwebtoken");
const Medecin = require("../models/MedecinModal");

const adminMedecinAuth = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Authorization token not found" });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const { userType } = decodedToken;

    const validUserTypes = ["admin", "medecin"];

    if (validUserTypes.includes(userType)) {
      req.userType = userType; // Add userType to the request object
      if (userType == "medecin") {
        const medecin = await Medecin.findById(decoded.id).select("-password");

        if (!medecin) {
          return res.status(400).json({ message: "No medecin has this id" });
        }
        req.medecin = medecin;
      }
      next(); // User type is valid, proceed to the next middleware or route handler
    } else {
      res.status(403).json({ message: "Unauthorized user type" });
    }
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = adminMedecinAuth;
