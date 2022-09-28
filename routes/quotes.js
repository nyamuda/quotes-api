let express = require("express");
let router = express.Router();
let quotesControllers = require("../controllers/index");


router.route("/")
    .get(quotesControllers.getQuotes)
    // .post(quotesControllers.addQuote);

router.route("/").post((req, res) => {
    /*    #swagger.parameters['obj'] = {
              in: 'body',
              description: 'Adding new quote',
              schema: { $ref: '#/definitions/AddQuote' }
      } */
    quotesControllers.addQuote(req, res)
})


router.route("/:id")
    .get(quotesControllers.getQuoteById);




module.exports = router;