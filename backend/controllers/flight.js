const Flight = require("../models/flight");

const getFlights = async(req,res) => {
    try{
        const filters = {};

        if(req.query.flightNumber){
            filters.flightNumber = req.query.flightNumber;
        }

        if(req.query.departure){
            filters.departure = req.query.departure;
        }

        if(req.query.arrival){
            filters.arrival = req.query.arrival;
        }

        if(req.query.price){
            const price = Number(req.query.minPrice);
            if(!isNaN(price)){
                filters.price = price;
            }
            else{
                return res.status(400).json({error:'Invalid minPrice value'});
            }
        }

        if(req.query.departureTime){
            //convert date string to date object
            const date = new Date(req.query.departureTime);
            //create date object for start of the day
            const startOfDay = new Date(date.setUTCHours(0, 0, 0, 0));
            //create date object for end of the day
            const endOfDay = new Date(date.setUTCHours(23, 59, 59, 999));

            filters.departureTime = {$gte: startOfDay, $lt: endOfDay};
        }

        const flights = await Flight.find(filters);
        return res.json(flights);
    }
    catch(error){
        return res.status(500).json({error: error.message});
    }
}

const getFlightById = async(req,res) => {
    try{
        const flight = await Flight.findById(req.params.id);
        if(!flight){
            return res.status(404).json({error: "No flight found"});
        }
        return res.status(200).json(flight);
    }
    catch(error){
        return res.status(500).json({error: error.message});
    }
};

const addFlight = async(req,res) => {
    try{
        const body = req.body;
        if(
            !body ||
            !body.airline ||
            !body.flightNumber ||
            !body.departure ||
            !body.arrival ||
            !body.departureTime ||
            !body.arrivalTime ||
            !body.price 
        ){
            return res.json({error: "Please fill in all the details"});
        }
        const flight = await Flight.create(req.body);
        return res.status(201).json({msg: "Flight added successfully"});
    }
    catch(error){
        return res.status(500).json({error: error.message});
    }
};

const updateFlight = async(req,res) => {
    try{
        const flight = await Flight.findByIdAndUpdate(req.params.id, req.body, {new:true});
        if(!flight) {
            return res.status(404).json({error: "Flight not found"});
        }
        return res.status(200).json({msg: "Flight details updated"});
    }
    catch(error){
        return res.status(500).json({error: error.message});
    }
};

const deleteFlight = async(req,res) => {
    try{
        const flight = await Flight.findByIdAndDelete(req.params.id);
        if(!flight){
            return res.status(404).json({error:"Flight not found"});
        }
        return res.status(200).json({msg:"Flight deleted successfully"});
    }
    catch(error){
        return res.status(500).json({error: error.message});
    }
};

module.exports = {
    getFlights,
    getFlightById,
    addFlight,
    updateFlight,
    deleteFlight,
}
