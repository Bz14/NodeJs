const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const vehicleService = require("./src/services/vehicleService");

app.use(bodyParser.json());

vehicleService.seed();

require("./swagger")(app);

/**
 * @swagger
 * /:
 *  get:
 *   description: Server check
 *  responses:
 *  '200':
 *   description: A successful response
 */
app.get("/", (req, res) => {
  res.status(200).send("Vehicle server");
});

/**
 * @swagger
 * /vehicle:
 *   post:
 *     summary: Create a new vehicle
 *     description: Endpoint to create a new vehicle record
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               make:
 *                 type: string
 *                 description: The vehicle make
 *               model:
 *                 type: string
 *                 description: The vehicle model
 *               year:
 *                 type: integer
 *                 description: The vehicle year
 *     responses:
 *       201:
 *         description: Vehicle created successfully
 *       400:
 *         description: Bad request
 */
app.post("/vehicle", vehicleService.createVehicle);

app.put("/vehicle/:id", vehicleService.updateVehicle);

app.get("/vehicle", vehicleService.getVehicles);

app.get("/vehicle/:id", vehicleService.getVehicle);

app.delete("/vehicle/:id", vehicleService.deleteVehicle);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Vehicle Service is running on port ${PORT}`);
});
