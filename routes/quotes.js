let express = require("express");
let router = express.Router();
let quotesControllers = require("../controllers/index");


router.route("/")
    .get(quotesControllers.getQuotes)
    .post(quotesControllers.addQuote);



router.route("/:id")
    .get(quotesControllers.getQuoteById);




module.exports = router;