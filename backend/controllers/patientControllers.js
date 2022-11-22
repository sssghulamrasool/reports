const PatientReport = require("../model/patientModel");
exports.readReport2 = async (req, res) => {
  const result = await PatientReport.find({});
  res.send({
    message: " Success",
    reports: result,
  });
};
exports.readReport = async (req, res) => {
  try {
    const perPageItem = 4;
    const page = parseInt(req.query.page || "0");
    const total = await PatientReport.countDocuments({});
    const result = await PatientReport.find({})
      .limit(perPageItem)
      .skip(perPageItem * page);
    res.send({
      message: " Success",
      totalPage: Math.ceil(total / perPageItem),
      reports: result,
    });
  } catch (error) {
    console.log(error);
  }
};
exports.createReport = (req, res) => {
  const result = new PatientReport({
    patientname: req.body.name,
    patientemail: req.body.email,
    patientdate: req.body.date,
    patientdisc: req.body.disc,
  });
  result.save();
  res.send({
    success: "Patient Record Successfully",
  });
};
exports.updateReport = async (req, res) => {
  const dataall = await PatientReport.find();
  PatientReport.updateOne(
    {
      _id: req.params.id,
    },
    {
      patientname: req.body.name,
      patientemail: req.body.email,
      patientdate: req.body.date,
      patientdisc: req.body.disc,
    },
    (err, data) => {
      if (!err) {
        res.send({
          message: "SuccessFull Update",
          reports: dataall,
        });
      }
    }
  );
};
exports.deleteReport = async (req, res) => {
  await PatientReport.deleteOne({ _id: req.params.id });
  res.send({
    message: "succesfully",
  });
};
exports.searchReport = async (req, res) => {
  const result = await PatientReport.find({
    $or: [{ patientname: { $regex: req.params.searchname } }],
  });
  res.send({
    message: " Success",
    totalReport: result.length,
    reports: result,
  });
};
exports.searchByIdReport = async (req, res) => {
  try {
    const result = await PatientReport.find({
      _id: req.params.seachid,
    });
    // const result = await PatientReport.find({
    //   _id: req.params.seachid,
    // });

    res.send({
      message: " Success",
      totalReport: result.length,
      reports: result,
    });
  } catch (error) {
    console.log(error);
  }
};
exports.searchDate = async (req, res) => {
  const result = await PatientReport.find({
    patientdate: req.params.seachdate,
  });
  res.send({
    message: "succes",
    totalReport: result.length,
    reports: result,
  });
};
