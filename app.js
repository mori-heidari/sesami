const express = require("express");
const bodyParser = require("body-parser");
// const rateLimit = require("express-rate-limit");
const cors = require("cors");
const path = require("path");
const config=require('config')
const helmet = require("helmet");
const hpp = require("hpp");
const xss = require("xss-clean");
const AppError = require("./src/services/error/error.class");
const globalErrorHandler = require("./src/http/controllers/error.controller");
const apiRouters = require("./routes/api/index");
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerOptions = require("./docs/swagger.option");
const app = express();
const mongoose=require('mongoose');
// ------------- body parser --------------
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// ------------- security --------------
app.use(cors({ credentials: true, origin: true }));
app.use(helmet());
app.disable("x-powered-by");
app.disable("authorization");
app.disable("etag");
app.disable("Referer");

// const limiter = rateLimit({
// 	max: 20,
// 	windowMs: 60 * 1000,
// 	message: "Too many requests from this IP, please try again in a minute.",
// });
// app.use("/api", limiter);
app.use(xss());
app.use(hpp());
// ------------- static directory --------------

app.use("/uploads", express.static("uploads"));
//------------health check------------
app.use("/api/v1/healthCheck", (req, res, err) => {
    return res.status(200).json({
        version: "0.0.1",
        build: "2",
        status: "live",
    });
});
//------------api document------------
const swaggerSpec = swaggerJSDoc(swaggerOptions);

app.get("/swagger-info.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
});
app.get("/docs", (req, res) => {
    res.sendFile(path.join(__dirname, "../docs/redoc.html"));
});
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
//------------ROUTES------------
app.use("/", apiRouters);
app.all("*", (req, res, next) => {
    next(new AppError(`Cannot find ${req.originalUrl} on this server!`, 404));
});
//db
mongoose.connect(process.env.DB_CONNECTION_STRING||config.get('db_connection_string'))
    .then(() => {
        console.log("connected to database");
    }).catch(err => {
    console.log("failed to connect to database" + err);
});
//------------ERROR HANDLING------------
app.use(globalErrorHandler);
process.on("uncaughtException", (err) => {
    console.log("UNCAUGHT EXCEPTION ----- Shutting down.");
    console.log(err);
    process.exit(1);
});
process.on("unhandledRejection", (err) => {
    console.log("UNHANDLED REJECTION ----- Shutting down.");
    console.log(err);
    process.exit(1);
});
module.exports = app;
