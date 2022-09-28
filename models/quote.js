let mongoose = require("mongoose");



//create a schema for the quotes collection
let quotesSchema = new mongoose.Schema({
    quote: String,
    author: String,
}, {
    timestamps: true
})


//create a model for the quotes collection
let Quote = mongoose.model("Quote", quotesSchema, 'quotes');

module.exports = Quote;