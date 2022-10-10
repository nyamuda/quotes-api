module.exports = require("./quotes");


module.exports.homeView = function(req, res) {
    return res.send("Welcome to the best quotes API");
}