let express = require("express");
const { route } = require("express/lib/application");
const axios = require('axios').default;
let router = express.Router();
require("dotenv").config();


router.route("/login/github")
    .get((req, res) => {
        res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.ClientID}`)
    })


router.route("/oauth-callback")
    .get((req, res) => {
        return res.json(getAccessToken(req.query.code));
    })

let getAccessToken = code => {

    let options = {
        method: 'POST',
        url: 'https://github.com/login/oauth/access_token',
        headers: {
            'Accept': 'application/json'
        },
        data: {
            client_id: `${process.env.ClientID}`,
            client_secret: `${process.env.ClientSecret}`,
            code: `${code}`
        }
    }

    let response = await axios(options);
    let responseOk = response && response.status === 200 && response.statusText == 'OK';
    if (responseOk) {
        return response;
    }




}

module.exports = router;