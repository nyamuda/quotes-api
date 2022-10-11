let helperFunctions = require("../library/functions");
require("dotenv").config();
let User = require("../models/user");
let jwt = require("jsonwebtoken");
let bcrypt = require("bcrypt");


module.exports.registerUser = async function(req, res) {
    try {
        //validate the user data
        let { value, error } = helperFunctions.validateNewUser(req.body);

        //if there is an error
        if (error) {
            return res.status(400).json({ "message": error.details[0].message });
        }

        //check to see if user already exists
        let foundUser = await User.findOne({ email: req.body.email });

        if (foundUser) {
            return res.status(409).json({ "message": "User already exists. Please login" })
        }

        //if all the user details are valid
        //lets hash the password
        let hashedPassword = await bcrypt.hash(req.body.password, 10);

        //now lets add the user to the database
        let user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })

        //create token
        let payload = {
            email: user.email,
            admin: false
        }
        let token = jwt.sign(payload, process.env.SECRET, { expiresIn: "24h" });

        return res.json({ token });

    } catch (error) {
        return res.json(error);
    }
}