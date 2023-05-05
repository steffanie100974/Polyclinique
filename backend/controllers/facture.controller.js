const AsyncHandler = require("express-async-handler");
const Facture = require("../models/FactureModal");

// post facture
const postFacture = AsyncHandler(async (req, res) => {
  try {
    const facture = await Facture.create(req.body);
    res.status(201).json(facture);
  } catch (error) {
    console.log("eroor facture ", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// delete ordonnance
const deleteFacture = AsyncHandler(async (req, res) => {
  const { _id } = req.params;
  try {
    const deletedFacture = await Facture.findByIdAndDelete(_id);
    if (deletedFacture) {
      res.status(200).json({ message: "Facture deleted successfully" });
    } else {
      res.status(404).json({ message: "Facture not found" });
    }
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = { postFacture, deleteFacture };
