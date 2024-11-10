const Vehicle = require("../models/vehicle");

const seedData = [];

const makes = ["Toyota", "Honda", "Ford", "Chevrolet", "Nissan"];
const models = ["Camry", "Civic", "F-150", "Silverado", "Altima"];
const years = [2018, 2019, 2020, 2021];

for (let i = 0; i < 50; i++) {
  const make = makes[Math.floor(Math.random() * makes.length)];
  const model = models[Math.floor(Math.random() * models.length)];
  const year = years[Math.floor(Math.random() * years.length)];
  const price = Math.floor(Math.random() * 100) * 100;
  const vehicle = new Vehicle(`ABC${i}`, make, model, year, price);
  seedData.push(vehicle);
}

module.exports = seedData;
