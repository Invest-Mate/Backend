const express = require("express");
import mongoose from "mongoose";
import morgan from "morgan";
import path from 'path';
const app = express();
const compression = require('compression');
require("dotenv").config();
import globalErrorController from "./controllers/error_controller";
import AppError from "./utils/appError";
process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
});
require("dotenv").config();
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}
mongoose
    .connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("DB connected"))
    .catch((e) => console.log(e));
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + '/views'));
app.use('/images/users', express.static(path.join(__dirname + '/public/img/users')));
app.use('/images/funds', express.static(path.join(__dirname + '/public/img/funds')));
app.engine('html', require('ejs').renderFile);
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.use(compression());
app.use('/api/transaction', require('./routes/transaction'));
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false }));

app.use('/api/user', require('./routes/user'));
app.use('/api/fund', require('./routes/funds'));
app.all("*", (req, res, next) => {
    // return res.status(400).json({
    //     status: "Request Failed",
    //     message: `Not able to find ${req.originalUrl} in the server!`
    // })
    var err = new Error(`Can't find ${req.originalUrl} on this server`);
    err.status = "fail";
    err.statusCode = 404;
    next(err);
});
//Above we introduced the error deliberately for testing
app.use(globalErrorController);
app.listen(PORT, () => {
    console.log(`App is listening on Port ${PORT}`);
});
process.on("unhandledRejection", (err) => {
    //This acts as a safety net for developer
    console.log("UNHANDLED REJECTION! 💥 Shutting down...");
    console.log(err.name, err.message);
    server.close(() => {
        //Server will get closed after implementing its pending requests
        process.exit(1);
        //This will terminate our app gracefully
    });
});