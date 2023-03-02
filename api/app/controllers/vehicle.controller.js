const db = require("../models");
const Vehicle = db.vehicle;
const User = db.user;

// const Op = db.Sequelize.Op;

exports.createVehicle = async (req, res) => {
  // Validate request
  if (
    !req.body.vtype ||
    !req.body.vmake ||
    !req.body.vlocation ||
    !req.body.vcapacity
  ) {
    res.status(400).send({
      message: "Type, Make, Location and Capacity are required!",
    });
    return;
  }

  // Create a Vehicle
  const vehicle = {
    vtype: req.body.vtype,
    vmake: req.body.vmake,
    vmileage: req.body.vmileage,
    vlocation: req.body.vlocation,
    vcapacity: req.body.vcapacity,
    userId: req.body.userId,
  };
  // Save Vehicle in the database
  Vehicle.create(vehicle)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Vehicle.",
      });
    });
};

exports.findAllVehicles = (req, res) => {
  Vehicle.findAll({
    include: [
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving vehicles.",
      });
    });
};
