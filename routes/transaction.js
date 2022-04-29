const express = require("express");
const app = express();
const { PaymentForm, PayNow, Callback } = require("../controllers/payment");
const parseUrl = express.urlencoded({ extended: false });
const parseJson = express.json({ extended: false });
app.get("/payment", PaymentForm);
app.post("/paynow", [parseUrl, parseJson], PayNow);
app.post("/callback", Callback);
module.exports = app;