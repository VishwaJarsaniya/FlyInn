require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const saltRounds = 10;


const handleRegister = async(req,res) => {
    const body = req.body;
    if(
       !body || 
       !body.name || 
       !body.email ||
       !body.password || 
       !body.mobileno ||
       !body.gender ||
       !body.age
    ){
        return res.status(400).json({error: "All fields are required"});
    }

    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(body.password, salt);

    const result = await User.create({
        name: body.name,
        email: body.email,
        password: hashedPassword,
        mobileno: body.mobileno,
        gender: body.gender,
        age: body.age
    })
    return res.status(201).json({msg:"Regsitered successfully", id: result._id});
};


const handleLogin = async(req,res) => {
    const body = req.body;
    if(
        !body ||
        !body.email ||
        !body.password
    ){
        return res.status(401).json({error:"All fields are required"});
    }
    
    const email = body.email;
    const password = body.password;
    const user = await User.findOne({email:email});

    if(user){
        const validPassword = await bcrypt.compare(password, user.password)
        if(validPassword){
            const token = jwt.sign({_id:user._id} , process.env.TOKEN_SECRET, {expiresIn: '2h'});
            return res.json(token);
        }
        else{
            return res.status(500).json({error:"Incorrect password"});
        }
    }
    else{
        return res.status(404).json({error:"No user found"})
    }

};

module.exports = {
    handleRegister,
    handleLogin,
}