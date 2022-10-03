let Quote = require("../models/quote");
let helperFunctions = require("../library/functions");




//get all the quotes

module.exports.getQuotes = async function(req, res) {
    try {
        let quotes = await Quote.find({});
        return res.json(quotes);
    } catch (error) {
        return res.json(error);
    }


}


// post a quote
module.exports.addQuote = function(req, res) {

    //validate the data

    let { value, error } = helperFunctions.validateNewPost(req.body);

    if (error) {
        return res.status(400).json({ "error": error.details[0].message })
    }

    Quote.create(req.body)
        .then(val => {
            res.statusCode = 201;
            return res.json(val["_id"]);

        })
        .catch(err => {
            res.statusCode = 500;
            return res.json({ "error": "quote was not created" })
        })
}

//get quotes by id

module.exports.getQuoteById = async function(req, res) {
    let quote = await Quote.findById(req.params.id)
        .then(val => res.json(val))
        .catch(err => res.json(err))


    return quote;
}

//delete quote by id
module.exports.deleteQuoteById = function(req, res) {
    Quote.findByIdAndDelete(req.params.id)
        .then(val => {
            return res.json({ "message": "The quote was successfully deleted" });
        })
        .catch(err => {
            return res.json({ "message": "Sorry, quote was not deleted" });
        })
}


//update quote
module.exports.updateQuoteById = (req, res) => {

    let { value, error } = helperFunctions.validePostUpdate(req.body);

    if (error) {
        return res.status(400).json({ "error": error.details[0].message });
    }

    Quote.findByIdAndUpdate(req.params.id, req.body)
        .then(val => {
            res.statusCode = 204;
            return res.json({ "message": "The quote was successfully updated" });
        })
        .catch(err => {
            return res.json({ "message": "Sorry, the quote was not updated" });
        })
}