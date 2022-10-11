let helperFunctions = require("../library/functions");
require("dotenv").config();
let User = require("../models/user");
let jwt = require("jsonwebtoken");
let bcrypt = require("bcrypt");



//login a user
modules.exports.loginUser = async function(req, res) {

    try {
        let email = req.body.email;
        let password = req.body.password;

        //if email and password fields are empty
        if (!(email && password)) {
            return res.status(400).json({ "message": "All fields are required" });
        }

        //get user using email
        let foundUser = User.findOne({ email });

        //if no user was found
        if (foundUser.length === 0) {
            return res.status(400).json({ "message": "Email does not exist" })
        }

        //compare passwords
        let is_password_correct = await bcrypt.compare(password, foundUser.password);

        if (!is_password_correct) {
            return res.status(400).json({ "message": "Incorrect password" })
        }

        //if all the login details are correct
        //create a token for the user
        let payload = {
            email,
            admin: false
        }
        let token = jwt.sign(payload, process.env.SECRET, { expiresIn: "24h" });

        return res.json({ token });



    } catch (error) {
        return res.json(error);
    }
}