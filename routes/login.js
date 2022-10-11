let router = require("express").Router();
let controllers = require("../controllers/login");





router.route("/login")
    .post((req, res) => {
          /*    #swagger.parameters['obj'] = {
                  in: 'body',
                  description: 'Login a user',
                  schema: { $ref: '#/definitions/loginUser' }
          } */
        controllers.loginUser(req, res);
    })


module.exports = router;