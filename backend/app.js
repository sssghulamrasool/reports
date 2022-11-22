const express = require("express");
require("./config/config.js");
const patientRoutes = require("./routes/patientRoutes");
var cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
app.use("/", patientRoutes);
app.listen(8080);
