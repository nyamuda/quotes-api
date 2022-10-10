const { response } = require("express");
let helperFunctions = require("../library/functions");




//get information about a GitHub user
module.exports.getGithubUser = async function(req, res) {

    //get access token first
    let access_token = await helperFunctions.getGithubAccessToken(req.query.code);

    //then get github user info
    let github_user = await helperFunctions.getGithubUser(access_token);

    return res.send(github_user);
}