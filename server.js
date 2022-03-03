import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { readdirSync } from "fs";
import morgan from 'morgan';
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
app.use(morgan('dev'));
//automatic reloading of routes
// readdirSync('./routes').map((r) => app.use("/api", require(`./routes/${r}`)))
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server listening on port ${port}`));