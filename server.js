import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { readdirSync } from "fs";
import morgan from "morgan";
const app = express();
require("dotenv").config();
mongoose
    .connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("DB connected"))
    .catch((e) => console.log(e));
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        origin: "http://localhost:3000",
    })
);
app.use(morgan("dev"));
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
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "Error occured";
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    });
});
//This is a global error handling code
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server listening on port ${port}`));