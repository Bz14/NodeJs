const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const vehicleService = require("./services/vehicleService");

app.use(bodyParser.json());
app.use(cors());

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

/**
 *  @swagger
 * /vehicle/{id}:
 *   put:
 *     summary: Update a vehicle by ID
 *     description: Updates the vehicle details based on the provided ID and request body.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the vehicle to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               make:
 *                 type: string
 *                 example: "Toyota"
 *               model:
 *                 type: string
 *                 example: "Corolla"
 *               year:
 *                 type: integer
 *                 example: 2020
 *     responses:
 *       '200':
 *         description: The vehicle was successfully updated.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vehicle'
 *       '404':
 *         description: Vehicle not found with the provided ID.
 *       '500':
 *         description: Internal server error.
 */
app.put("/vehicle/:id", vehicleService.updateVehicle);

/**
 * @swagger
 * /vehicle:
 *   get:
 *     summary: Get a list of vehicles
 *     description: Retrieves a list of all vehicles.
 *     responses:
 *       '200':
 *         description: A list of vehicles.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Vehicle'
 *       '500':
 *         description: Internal server error.
 */
app.get("/vehicle", vehicleService.getVehicles);

/**
 * @swagger
 * /vehicle/{id}:
 *   get:
 *     summary: Get a vehicle by ID
 *     description: Retrieves a single vehicle based on the provided ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the vehicle to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A single vehicle.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vehicle'
 *       '404':
 *         description: Vehicle not found with the provided ID.
 *       '500':
 *         description: Internal server error.
 */
app.get("/vehicle/:id", vehicleService.getVehicle);

/**
 * @swagger
 * /vehicle/{id}:
 *   delete:
 *     summary: Delete a vehicle by ID
 *     description: Deletes a vehicle based on the provided ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the vehicle to delete.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Vehicle was successfully deleted.
 *       '404':
 *         description: Vehicle not found with the provided ID.
 *       '500':
 *         description: Internal server error.
 */
app.delete("/vehicle/:id", vehicleService.deleteVehicle);

const PORT = 8081;
app.listen(PORT, () => {
  console.log(`Vehicle Service is running on port ${PORT}`);
});
