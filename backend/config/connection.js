const mongoose = require("mongoose");

async function connectMongoDb(url){
    return await mongoose.connect(url)
                         .then(()=>{console.log("MongoDb Connected")})
                         .catch((err)=>{console.log("Error in connecting db", err)})
}

module.exports = {
    connectMongoDb,
}