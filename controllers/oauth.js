let helperFunctions = require("../library/functions");
require("dotenv").config();
let User = require("../models/user");
let jwt = require("jsonwebtoken");






//get information about a GitHub user
module.exports.getGithubUser = async function(req, res) {

    try {
        //get access token first
        let access_token = await helperFunctions.getGithubAccessToken(req.query.code);

        //then get github user info
        let github_user = await helperFunctions.getGithubUser(access_token);

        //get the data for the database
        let important_user_data = {
            name: github_user.name,
            email: github_user.email
        }

        //check to see if user data is already in the database
        let old_user = await User.findOne({ email: important_user_data.email });

        //if doesn't already exist
        //create a new one
        if (old_user.length === 0) {
            User.create(important_user_data)
        }

        //create a token
        let payload = {
            email: important_user_data.email,
            admin: false
        }
        let token = jwt.sign(payload, process.env.SECRET, { expiresIn: "24h" });

        return res.json(token);

    } catch (error) {

        return res.json(error);
    }
}