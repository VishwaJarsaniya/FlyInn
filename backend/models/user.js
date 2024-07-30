const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password:{
        type: String,
        required: true,
    },
    mobileno:{
        type: Number,
        required: true,
    },
    gender:{
        type: String,
        enum: ['male', 'female', 'prefer not to say'],
        required: true,
    },
    age:{
        type: Number,
        required: true,
    }
});

const User = new mongoose.model("User", userSchema);

module.exports = User;