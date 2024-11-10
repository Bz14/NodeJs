const mongoose = require("mongoose");

const uri = "mongodb://localhost:27017/vehicles";

const options = {
  useNewUrlParser: true,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  autoIndex: true,
};

async function connect() {
  try {
    await mongoose.connect(uri, options);
    console.log("Connected to database");
  } catch (error) {
    console.error("Error connecting to database", error);
  }
}

async function disconnect() {
  try {
    await mongoose.disconnect();
    console.log("Disconnected from database");
  } catch (error) {
    console.error("Error disconnecting from database", error);
  }
}

module.exports = { connect, disconnect };
