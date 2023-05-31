const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Authorization token not found" });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const { userType } = decodedToken;

    const validUserTypes = ["admin", "medecin", "patient"];

    if (validUserTypes.includes(userType)) {
      req.userType = userType; // Add userType to the request object
      next(); // User type is valid, proceed to the next middleware or route handler
    } else {
      res.status(403).json({ message: "Unauthorized user type" });
    }
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;
