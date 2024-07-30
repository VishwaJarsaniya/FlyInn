const express = require("express");
const {authenticateToken} = require("../middleware/authenticate");
const {createFlightBooking,
       getFlightBookings,
       getFlightBookingById,
       cancelFlightBooking,} = require("../controllers/flightBooking");

const router = express.Router();

router.post("/create", authenticateToken, createFlightBooking);

router.get("/getAllBookings", authenticateToken, getFlightBookings);

router.get("/getBookingById/:id", authenticateToken, getFlightBookingById);

router.patch("/cancel/:id", authenticateToken, cancelFlightBooking);

module.exports = router;