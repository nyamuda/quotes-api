require("dotenv").config();
let express = require("express");
let quoteRoutes = require("./routes/quotes");
let homeRoute = require("./routes/index");
let quoteModels = require("./models/index");
let authorizationRoutes = require("./routes/authorization")
let app = express();





const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');



app.use(express.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});
app.use("/", homeRoute);
app.use("/quotes", quoteRoutes);
app.use(authorizationRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));




//create a connection with the databse


//listen to a port
app.listen(process.env.PORT, () => {
    console.log("Quotes API now running");
    //run database
    quoteModels.connect()
})