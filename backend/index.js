require("dotenv").config();
const express = require("express");
const {connectMongoDb} = require("./config/connection");
const userRoute = require("./routes/user");
const flightRoute = require("./routes/flight");
const flightBookingRoute = require("./routes/flightBooking");

const app = express();

const PORT = process.env.PORT;
const url = process.env.mongodbUrl;

app.use(express.json());
app.use(express.urlencoded({extended:false}));

connectMongoDb(url);

app.use("/user", userRoute);
app.use("/", flightRoute);
app.use("/flightBooking", flightBookingRoute);


app.listen(PORT, ()=>{console.log(`Server started on port ${PORT}`)});