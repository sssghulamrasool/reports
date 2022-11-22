const mongoose = require("mongoose");

const patientsreport = new mongoose.Schema({
  patientname: String,
  patientemail: String,
  patientdate: String,
  patientdisc: String,
});

const PatientReport = mongoose.model("patientRecords", patientsreport);
module.exports = PatientReport;
