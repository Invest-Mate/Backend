require("dotenv").config();
var PaytmConfig = {
    mid: process.env.PAYMENT_MID,
    key: process.env.PAYMENT_KEY,
    website: process.env.PAYMENT_WEBSITE
}

module.exports.PaytmConfig = PaytmConfig