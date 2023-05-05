const jwt = require("jsonwebtoken");

function checkRole(role) {
  return (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: "Authentication failed." });
    }

    try {
      const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
      const userRole = decoded.role;

      if (userRole !== role) {
        return res.status(403).json({ message: "Authorization failed." });
      }

      req.userData = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ message: "Authentication failed." });
    }
  };
}

module.exports = checkRole;
