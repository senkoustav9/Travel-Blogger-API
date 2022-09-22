const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    title:{
        type: String,
        required: [true,"Title is requried"],
        unique: true
    },
    description:{
        type:String,
        required: [true,"A Post must have a description"]
    },
    photo:{
        type:String,
        required: false
    },
    username: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Post", PostSchema);