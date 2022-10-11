let mongoose = require("mongoose");


//create a schema for user documents
let userSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    admin: { type: Boolean, default: false }
}, {
    timestamps: true
})


//create a model for a user
let User = mongoose.model("User", userSchema, "users");

module.exports = User;