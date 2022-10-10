let express = require("express");
let controllers = require("../controllers/authorization")
let router = express.Router();
require("dotenv").config();


//authorize the app to use use GitHub
router.route("/login/github")
    .get((req, res) => {
        res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.ClientID}`)
    })



//get the code
//get the authorization token
router.route("/oauth-callback")
    .get((req, res) => {
        controllers.getGithubUser(req, res);
    })



module.exports = router;