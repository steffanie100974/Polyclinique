// const jwt = require("jsonwebtoken");
// const asyncHandler = require("express-async-handler");
// const Patient = require("../models/patient.modal");
// const Personnal = require("../models/personnal.modal");
// const Service = require("../models/service.modal");

// const protect = asyncHandler(async (req, res, next) => {
//   let token;

//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer")
//   ) {
//     try {
//       token = req.headers.authorization.split(" ")[1];
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       req.patient = await Patient.findById(decoded.id).select("-password");
//       req.personnal = await Personnal.findById(decoded.id).select("-password");
//       req.service = await Service.findById(decoded.id);

//       next();
//     } catch (err) {
//       console.log(err);
//       return res.status(401).json({ msg: "request is not authorized" });
//     }
//   }

//   if (!token) {
//     res.status(401).json({ msg: "Not Authorized, no token" });
//   }
// });

// module.exports = { protect };
