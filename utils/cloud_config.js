require("dotenv").config();
var CloudConfig = {
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret
};
module.exports.CloudConfig = CloudConfig;