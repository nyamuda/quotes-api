require("dotenv").config();
let mongoose = require("mongoose");
const password = process.env.PASSWORD;

let url = `mongodb+srv://tnyamuda:${password}@cluster0.vpaqxqq.mongodb.net/?retryWrites=true&w=majority`

module.exports.connect = function() {

    try {
        mongoose.connect(url);
    } catch (error) {
        console.log('Failed to connect to database');
    }
}