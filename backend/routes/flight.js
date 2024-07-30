const express = require("express");
const {authenticateToken} = require("../middleware/authenticate");
const {getFlights,
       getFlightById,
       addFlight,
       updateFlight,
       deleteFlight} = require("../controllers/flight");

const router = express.Router();

router.get("/getFlights", authenticateToken, getFlights);

router.get("/getFlightById/:id", authenticateToken, getFlightById);

router.post("/addFlight", authenticateToken, addFlight);

router.patch("/updateFlight/:id", authenticateToken, updateFlight);

router.delete("/deleteFlight/:id", authenticateToken, deleteFlight);

module.exports = router;