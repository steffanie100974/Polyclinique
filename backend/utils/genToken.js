const jwt = require("jsonwebtoken");

const genToken = (id, userType) => {
  return jwt.sign({ id, userType }, process.env.JWT_SECRET);
};

module.exports = genToken;
