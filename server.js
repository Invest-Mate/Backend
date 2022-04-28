import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { readdirSync } from "fs";
import morgan from "morgan";
import https from "https";
import path from "path";
import fs from "fs";
import qs from "querystring";
import PaytmChecksum from "./helpers/checksum";
import PaytmConfig from "./helpers/config";
import globalErrorController from "./controllers/error_controller";

import AppError from "./utils/appError";
import {
    PaymentForm,
    PayNow
} from "./controllers/payment";
process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
});
const app = express();
require("dotenv").config();
mongoose
    .connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("DB connected"))
    .catch((e) => console.log(e));
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false }));
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

// automatic reloading of routes
readdirSync("./routes").map((r) => app.use("/api", require(`./routes/${r}`)));
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
//This is a global error handling code
const port = process.env.PORT || 8000;
const server = app.listen(port, () =>
    console.log(`Server listening on port ${port}`)
);

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
//We are using event handler to catch any asynchronus unhandled exception