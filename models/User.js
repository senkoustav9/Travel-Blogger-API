const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true,"Username is required"],
        unique: true,
        min: [6,"Minimum length of username required is 6"]
    },
    email:{
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    password:{
        type: String,
        required : [true,"Password is required"],
        min: [8,"Minimum length of password required is 8"]
    },
    profilePic:{
        type: String,
        default: ""
    },
},{timestamps:true});

module.exports = mongoose.model('User',UserSchema);