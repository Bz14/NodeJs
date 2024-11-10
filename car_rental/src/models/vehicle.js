const { v4: uuidv4 } = require("uuid");

class Vehicle {
  constructor(regNo, make, model, year, price) {
    if (
      typeof regNo !== "string" ||
      typeof make !== "string" ||
      typeof model !== "string" ||
      typeof model !== "string"
    ) {
      throw new Error("Registration, make and models must be a strings");
    }
    if (typeof year !== "number" || typeof price !== "number") {
      throw new Error("Year and price must be a number");
    }
    this.regNo = regNo;
    this.make = make;
    this.model = model;
    this.year = year;
    this.price = price;
    this.id = uuidv4();
  }
}

module.exports = Vehicle;
