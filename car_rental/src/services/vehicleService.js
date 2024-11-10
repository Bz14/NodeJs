const Vehicle = require("../models/vehicle");
const { connect, disconnect } = require("../db_client");

exports.seed = async function () {
  await connect();

  // await disconnect();
};

exports.createVehicle = async function (req, res) {
  const vehicle = new Vehicle(req.body);
  try {
    console.log("=====", vehicle);
    await vehicle.save();
    res.status(201).send(vehicle);
  } catch (e) {
    console.log("=====", vehicle);
    res.status(500).send(e.message);
  }
};

exports.updateVehicle = async function (req, res) {
  const id = req.params.id;
  try {
    const vehicle = await Vehicle.findByIdAndUpdate(id, req.body);

    if (vehicle) {
      res.status(200).send(vehicle);
    }
    res.status(404).send("Vehicle not found");
  } catch (e) {
    res.status(500).send(e.message);
  }
};

exports.getVehicles = async function (req, res) {
  try {
    const data = await Vehicle.find();
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

exports.getVehicle = async function (req, res) {
  const id = req.params.id;

  try {
    const vehicle = await Vehicle.findById(id);

    if (vehicle) {
      res.status(200).send(vehicle);
    } else {
      res.status(404).send("Vehicle not found");
    }
  } catch (e) {
    res.status(500).send(e.message);
  }
};

exports.deleteVehicle = async function (req, res) {
  try {
    const vehicle = await Vehicle.findByIdAndDelete(req.params.id);

    if (vehicle) {
      res.status(204).send({ message: "Vehicle deleted" });
    } else {
      res.status(404).send("Vehicle not found");
    }
  } catch (e) {
    res.status(500).send(e.message);
  }
};
