let router = require("express").Router();
let controllers = require("../controllers/register");


router.route("/register")
    .post((req, res) => {
          /*    #swagger.parameters['obj'] = {
                  in: 'body',
                  description: 'Register a new user',
                  schema: { $ref: '#/definitions/registerUser' }
          } */
        controllers.registerUser(req, res);
    })


module.exports = router;