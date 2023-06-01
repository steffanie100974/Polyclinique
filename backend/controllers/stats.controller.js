const Patient = require("../models/PatientModal");
const RDV = require("../models/rendezVous.modal");
const Facture = require("../models/FactureModal");
const Medecin = require("../models/MedecinModal");

const getStats = async (req, res) => {
  try {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    // Calculate new patients count for the current month
    const newPatientsCount = await Patient.countDocuments({
      createdAt: { $gte: new Date(currentYear, currentMonth, 1) },
    });

    // Calculate new RDVs count for the current month
    const newRDVSCount = await RDV.countDocuments({
      createdAt: { $gte: new Date(currentYear, currentMonth, 1) },
    });

    // Calculate month revenue for paid factures
    const monthRevenue = await Facture.aggregate([
      {
        $match: {
          createdAt: { $gte: new Date(currentYear, currentMonth, 1) },
          isPaid: true,
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$price" },
        },
      },
    ]);

    // Calculate total patients count
    const patientsCount = await Patient.countDocuments();

    // Calculate total RDVs count
    const rdvsCount = await RDV.countDocuments();

    // Calculate total revenue for paid factures
    const totalRevenue = await Facture.aggregate([
      {
        $match: { isPaid: true },
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$price" },
        },
      },
    ]);

    // Count the number of medecin documents
    const doctorsCount = await Medecin.countDocuments();

    return res.status(200).json({
      newPatientsCount,
      newRDVSCount,
      monthRevenue: monthRevenue.length > 0 ? monthRevenue[0].totalRevenue : 0,
      patientsCount,
      rdvsCount,
      totalRevenue: totalRevenue.length > 0 ? totalRevenue[0].totalRevenue : 0,
      doctorsCount,
    });
  } catch (error) {
    console.log("error get stats", error);
    res.status(500).json(error);
  }
};

module.exports = { getStats };
