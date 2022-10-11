let router = require("express").Router();
let controllers = require("../controllers/login");





router.route("/login")
    .post((req, res) => {
        controllers.loginUser(req, res);
    })


module.exports = router;