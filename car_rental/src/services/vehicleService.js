let data = require("../../data/seedData");
const Vehicle = require("../../models/vehicle");

exports.seed = function () {
  return data;
};

exports.createVehicle = function (req, res) {
  const regNo = String(req.body.regNo);
  const make = String(req.body.make);
  const model = String(req.body.model);
  const year = parseInt(req.body.year);
  const price = parseInt(req.body.price);
  const vehicle = new Vehicle(regNo, make, model, year, price);
  console.log(req.body, vehicle);

  if (
    !vehicle.regNo ||
    !vehicle.make ||
    !vehicle.model ||
    !vehicle.year ||
    !vehicle.price
  ) {
    return res.status(400).send({ message: "Invalid vehicle data" });
  }

  data.push(vehicle);

  res.status(201).send("Vehicle created");
};

exports.updateVehicle = function (req, res) {
  const id = req.params.id;
  try {
    const idx = data.findIndex((v) => v.id === id);

    if (idx !== -1) {
      data[idx] = { ...data[idx], ...req.body };
      res.status(200).send(data[idx]);
    } else {
      res.status(404).send("Vehicle not found");
    }
  } catch (e) {
    res.status(500).send(e.message);
  }
};

exports.getVehicles = function (req, res) {
  res.status(200).send(data);
};

exports.getVehicle = function (req, res) {
  const id = req.params.id;

  const vehicle = data.find((v) => v.id === id);
  console.log(vehicle, id);

  if (vehicle) {
    res.status(200).send(vehicle);
  } else {
    res.status(404).send("Vehicle not found");
  }
};

exports.deleteVehicle = function (req, res) {
  const id = req.params.id;

  const idx = data.findIndex((v) => v.id === id);
  if (idx === -1) {
    return res.status(404).send("Vehicle not found");
  }

  data.splice(idx, 1);

  res.status(204).send({ message: "Vehicle deleted" });
};
