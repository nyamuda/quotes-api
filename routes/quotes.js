let express = require("express");
let router = express.Router();
let quotesControllers = require("../controllers/index");
let middleware = require("../library/functions");


router.route("/")
    .get(middleware.ensureLogin,quotesControllers.getQuotes)
    // .post(quotesControllers.addQuote);

router.route("/")
    .post(middleware.ensureAdmin,(req, res) => {
        /*    #swagger.parameters['obj'] = {
                  in: 'body',
                  description: 'Add new quote. Only admins have the authority to do this.\n 
                  Default admin details &#187; <b>email: </b><i>admin@example.com</i>, <b>password: </b><i>helloworld</i>. \n
                  Login with those details and get the authorization token.',
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
                  description: 'Updating a quote. Only admins have the authority to do this.\n 
                  Default admin details &#187; <b>email: </b><i>admin@example.com</i>, <b>password: </b><i>helloworld</i>. \n
                  Login with those details and get the authorization token.',
                  schema: { $ref: '#/definitions/UpdateQuote' }
          } */
        quotesControllers.updateQuoteById(req, res);
    })

router.route("/:id")
    .delete(middleware.ensureAdmin, (req,res)=>{
          /*    #swagger.parameters['id'] = {
               
                  description: 'Delete a quote. Only admins have the authority to do this.\n 
                  Default admin details &#187; <b>email: </b><i>admin@example.com</i>, <b>password: </b><i>helloworld</i>. \n
                  Login with those details and get the authorization token.'
                  
          } */
        quotesControllers.deleteQuoteById(req,res)
    })

module.exports = router;