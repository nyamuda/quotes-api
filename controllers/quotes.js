let Quote = require("../models/quote");




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

    /*    #swagger.parameters['obj'] = {
              in: 'body',
              description: 'Adding new user.',
              schema: { $ref: '#/definitions/AddQuote' }
      } */

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