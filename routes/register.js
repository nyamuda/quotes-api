let router = require("express").Router();
let controllers = require("../controllers/register");


router.route("/register")
    .post((req, res) => {
        controllers.registerUser(req, res);
    })


module.exports = router;