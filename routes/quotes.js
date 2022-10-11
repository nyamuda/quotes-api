let express = require("express");
let router = express.Router();
let quotesControllers = require("../controllers/index");
let middleware = require("../library/functions");


router.route("/")
    .get(middleware.ensureLogin, quotesControllers.getQuotes)
    // .post(quotesControllers.addQuote);

router.route("/")
    .post(middleware.ensureAdmin, (req, res) => {
        /*    #swagger.parameters['obj'] = {
                  in: 'body',
                  description: 'Adding new quote',
                  schema: { $ref: '#/definitions/AddQuote' }
          } */
        quotesControllers.addQuote(req, res)
    })


router.route("/:id")
    .get(middleware.ensureLogin, quotesControllers.getQuoteById);


router.route("/:id")
    .put(middleware.ensureAdmin, (req, res) => {
        /*    #swagger.parameters['obj'] = {
                  in: 'body',
                  description: 'Updating a quote',
                  schema: { $ref: '#/definitions/UpdateQuote' }
          } */
        quotesControllers.updateQuoteById(req, res);
    })

router.route("/:id")
    .delete(middleware.ensureAdmin, quotesControllers.deleteQuoteById)

module.exports = router;