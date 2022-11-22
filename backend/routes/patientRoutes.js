const express = require("express");
const router = express.Router();
const patientControllers = require("../controllers/patientControllers");

router.post("/createReport", patientControllers.createReport);
router.get("/readReport", patientControllers.readReport);
router.get("/readReport2", patientControllers.readReport2);
router.delete("/deleteReport/:id", patientControllers.deleteReport);
router.put("/updateReport/:id", patientControllers.updateReport);
router.get("/searchReport/:searchname", patientControllers.searchReport);
router.get("/searchByIdReport/:seachid", patientControllers.searchByIdReport);
router.get("/seachByDate/:seachdate", patientControllers.searchDate);
module.exports = router;
