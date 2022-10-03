module.exports = require("./quotes");

module.exports.homeView = function(req, res) {
    return res.send("WELCOME TO THE BEST QUOTES API");
}