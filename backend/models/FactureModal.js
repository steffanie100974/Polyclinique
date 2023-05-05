const mongoose = require("mongoose");

const factureSchema = mongoose.Schema(
  {
    rdvID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "rendez-vous",
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    deadline: {
      type: Date,
      default: () => new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
    },
  },
  { timestamps: true }
);

const Facture = mongoose.model("facture", factureSchema);

module.exports = Facture;
