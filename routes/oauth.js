let express = require("express");
const { route } = require("express/lib/application");
let router = express.Router();
require("dotenv").config();


router.use("/github")
    .get((req, res) => {
        fetch(`https://github.com/login/oauth/authorize?client_id=${process.env.ClientID}&`)
    })


route.use("/oauth-callback")
    .get((req, res) => {

    })