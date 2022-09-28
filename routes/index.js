let homeRouter = require("express").Router();
let controllers = require("../controllers/index");


homeRouter.route("")
    .get(controllers.homeView);


module.exports = homeRouter;