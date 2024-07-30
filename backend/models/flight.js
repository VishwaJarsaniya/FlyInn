const mongoose = require("mongoose");

const flightSchema = new mongoose.Schema({
    airline:{
        type: String,
        required: true,
        trim: true,
    },
    flightNumber:{
        type: String,
        required: true,
        trim: true,
    },
    departure:{
        type: String,
        required: true,
        trim: true,
    },
    arrival:{
        type: String,
        required: true,
        trim: true,
    },
    departureTime:{
        type: Date,
        required: true,
    },
    arrivalTime:{
        type: Date,
        required: true,
    },
    class:{
        type: String,
        enum: ['economy', 'premium economy', 'business'],
    },
    stops:{
        type: String,
        default: 'Non-stop',
    },
    price:{
        type: Number,
        required: true,
    },
    duration:{
        type: String,
        required: true,
    },
    images:[{
        type: String,
    }],
    details:{
        type: String
    }
});

const Flight = new mongoose.model("Flight", flightSchema);

module.exports = Flight;