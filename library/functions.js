let Joi = require("joi");
require("dotenv").config();
const axios = require('axios');
let User = require("../models/user");
let jwt = require("jsonwebtoken");




//ensure you're a logged in user --- middleware
module.exports.ensureLogin = (req, res, next) => {
    try {
        let header_value = req.body.token || req.headers.authorization.split(" ")[1];
        let token = jwt.verify(header_value, process.env.SECRET);
        return next()

    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
}


//ensure you're an admin --- middleware
module.exports.ensureAdmin = (req, res, next) => {
    try {
        let header_value = req.body.token || req.header.authorization.split(" ")[1];
        let token = jwt.verify(header_value, process.env.SECRET);

        //if the user is not an admin, or if admin=false
        if (!token.admin) {
            return res.status(401).json({ message: "You do not have the authority to carry out this action." })
        }

        return next()

    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" })
    }
}

//validate new user
module.exports.validateNewUser = data => {
    let schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required()
    })

    return schema.validate(data);
}

//validate new quote
module.exports.validateNewPost = (data) => {

    let schema = Joi.object({
        quote: Joi.string().min(5).required(),
        author: Joi.string().min(3).required()
    })

    return schema.validate(data);
}


//validate quote update
module.exports.validePostUpdate = data => {
    let schema = Joi.object({
        quote: Joi.string().min(5),
        author: Joi.string().min(3)
    })

    return schema.validate(data);
}


//get github access token
module.exports.getGithubAccessToken = async function(code) {
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
        return response.data.access_token;
    }
}

//get github user information
module.exports.getGithubUser = async function(token) {
    let options = {
        method: 'GET',
        url: 'https://api.github.com/user',
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    let response = await axios(options);
    let responseOk = response && response.status === 200 && response.statusText == 'OK';
    if (responseOk) {
        return response.data;
    }
}


//check if a user exists
//if they don't, we create a new one
module.exports.checkUserExists = async function(email) {

    let user = await User.findOne({ email });

    if (user) {

    }

}