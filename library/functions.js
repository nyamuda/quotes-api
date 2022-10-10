let Joi = require("joi");
const axios = require('axios');

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
        return response;
    }
}