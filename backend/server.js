const express = require("express");
const dotenv = require("dotenv").config();
const colors = require("colors");
const cors = require("cors");

const PORT = process.env.PORT;
const departmentRoutes = require("./routes/department.routes");

const DB = require("./DB/conn");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

DB();

app.use("/admin", require("./routes/admin.routes"));
app.use("/patient", require("./routes/patient.routes"));
app.use("/medecin", require("./routes/medecin.routes"));
app.use("/rendezvous", require("./routes/rdv.routes"));
app.use("/factures", require("./routes/facture.routes"));
app.use("/service", require("./routes/service.routes"));
app.use("/departments", departmentRoutes);

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
