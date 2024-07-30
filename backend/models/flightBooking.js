const mongoose = require("mongoose");

const flightBookingSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    flightId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Flight',
        required: true,
    },
    totalPrice:{
        type: Number,
        required: true,
    },
    passengers:[{
        name:{
            type: String,
            required: true,
        },
        age:{
            type: Number,
            required: true,
        },
        email:{
            type: String,
        }
    }],
    bookingDate:{
        type: Date,
        default: Date.now,
        required: true,
    },
    status:{
        type: String,
        enum: ['booked', 'canceled'],
        default: 'booked',
    },
    paymentId:{
        type: String,
        required: true,
    }
});

const FlightBooking = new mongoose.model("FlightBooking", flightBookingSchema);

module.exports = FlightBooking;