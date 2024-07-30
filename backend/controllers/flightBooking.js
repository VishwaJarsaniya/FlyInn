const FlightBooking = require("../models/flightBooking");

const createFlightBooking = async(req,res) => {
    try{
        const { flightId, totalPrice, passengers, bookingDate, status, paymentId } = req.body;

        if (!flightId || !totalPrice || !passengers || !paymentId) {
            return res.status(400).json({ error: "All details required" });
        }

        const updatedPassengers = passengers.map((passenger) => {
            if (passenger.name === req.user.name && passenger.email === req.user.email) {
              return {
                name: req.user.name,
                age: req.user.age,
                _id: req.user._id 
              };
            }
            return passenger;
          });

        const booking = await FlightBooking.create({
        userId: req.user._id,
        flightId,
        totalPrice,
        passengers: updatedPassengers,
        bookingDate: bookingDate || Date.now(),
        status: status || 'booked',
        paymentId
        })
        return res.status(201).json(booking);
    }
    catch(error){
        return res.json({error: error.message});
    }
};

const getFlightBookings = async(req,res) => {
    try{
        const bookings = await FlightBooking.find({userId: req.user._id});
        if(!bookings){
            return res.json({msg:"No bookings found"});
        }
        return res.status(200).json(bookings);
    }
    catch(error){
        return res.status(500).json({error: error.message});
    }
};

const getFlightBookingById = async(req,res) => {
    try{
        const booking = await FlightBooking.findById(req.params.id);
        if(!booking){
            return res.json({msg: "Booking not found"});
        }
        return res.status(200).json(booking);
    }
    catch(error){
        return res.status(500).json({})
    }
};

const cancelFlightBooking = async(req,res) => {
    try{
        const cancelledBooking = await FlightBooking.findByIdAndUpdate(req.params.id, {status: 'cancelled'}, {new: true});
        if(!cancelledBooking){
            return res.json({msg: "Booking not found"});
        }
        return res.status(200).json(cancelledBooking);
    }
    catch(error){
        return res.status(500).json({})
    }
};

module.exports = {
    createFlightBooking,
    getFlightBookings,
    getFlightBookingById,
    cancelFlightBooking,
}
