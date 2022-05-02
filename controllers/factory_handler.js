import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError";
import user from "../models/user.js";
import path from "path";
import { CloudConfig } from "../utils/cloud_config.js";
const cloudinary = require("cloudinary");
require("dotenv").config();
import APIFeatures from "../utils/apiFeatures";
cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret,
});
async function uploadToCloudinary(locaFilePath) {
    // locaFilePath: path of image which was just
    // uploaded to "uploads" folder

    var mainFolderName = "main";
    // filePathOnCloudinary: path of image we want
    // to set when it is uploaded to cloudinary
    var filePathOnCloudinary = mainFolderName + "/" + locaFilePath;
    console.log("Yes uploading");
    return cloudinary.uploader
        .upload(locaFilePath, { public_id: filePathOnCloudinary })
        .then((result) => {
            // Image has been successfully uploaded on
            // cloudinary So we dont need local image
            // file anymore
            // Remove file from local uploads folder
            // fs.unlinkSync(locaFilePath);

            return {
                message: "Success",
                url: result.url,
            };
        })
        .catch((error) => {
            // Remove file from local uploads folder
            // fs.unlinkSync(locaFilePath);
            return {
                message: "Fail",
                error: error,
            };
        });
}
export const deleteOne = (Model) =>
    catchAsync(async(req, res, next) => {
        const doc = await Model.findByIdAndDelete(req.body.id);

        if (!doc) {
            return next(new AppError("No document found with that ID", 404));
        }

        return res.status(204).json({
            status: "success",
            message: `Successfully deleted ${req.body.id}`,
        });
    });

export const updateOne = (Model) =>
    catchAsync(async(req, res, next) => {
        if (req.file) {
            var locaFilePath = path.join(__dirname, '../', '/public/img/users', req.file.filename);
            console.log("Localpath=", locaFilePath);
            var result = await uploadToCloudinary(locaFilePath);

            console.log("Result Url =", result);
            req.body.photo = result.url;
        }
        // const data = {};
        var proofsArray = [];
        // data.imageCover = req.files.imageCover.originalname;
        if (Model != user) {
            if (req.files.proofs != undefined) {
                for (var i = 0; i < req.files.proofs.length; i++) {
                    var locaFilePath = path.join(__dirname, '../', req.files.proofs[i].path);
                    console.log(locaFilePath);
                    // Upload the local image to Cloudinary
                    // and get image url as response
                    var result = await uploadToCloudinary(locaFilePath);
                    console.log(result);
                    proofsArray.push(result.url);
                }
                req.body.proofs = proofsArray;
            }
            // console.log(req.body.proofs);
            if (req.files.imageCover) {
                var locaFilePath = "public\\img\\funds\\" + req.files.imageCover[0].filename;
                console.log(locaFilePath);
                var result = await uploadToCloudinary(locaFilePath);
                console.log(result);
                req.body.imageCover = result.url;
                // req.body.imageCover = req.files.imageCover[0].filename;
            }
        }
        const doc = await Model.findByIdAndUpdate(req.body.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!doc) {
            return next(new AppError("No document found with that ID", 404));
        }

        res.status(200).json({
            status: "success",
            data: doc,
        });
    });

export const createOne = (Model) =>
    catchAsync(async(req, res, next) => {
        // if (req.file) req.body.photo = req.file.filename;
        // // const data = {};
        // var proofsArray = [];
        // // console.log(req.files);
        // // data.imageCover = req.files.imageCover.originalname;
        // if (Model != user) {
        //     if (req.files.proofs != undefined) {
        //         req.files.proofs.map((proof) => proofsArray.push(proof.filename));
        //         req.body.proofs = proofsArray;
        //     }
        //     // console.log(req.body.proofs);
        //     if (req.files.imageCover)
        //         req.body.imageCover = req.files.imageCover[0].filename;
        // }
        const doc = await Model.create(req.body);

        res.status(201).json({
            status: "success",
            data: {
                data: doc,
            },
        });
    });

export const getOne = (Model, popOptions) =>
    catchAsync(async(req, res, next) => {
        let query = Model.findById(req.params.id)
            .populate(popOptions)
            .select("-__v");
        // if (popOptions) query = query.populate(popOptions);

        // console.log(popOptions);

        const doc = await query;
        console.log(doc);
        if (!doc) {
            return next(new AppError("No document found with that ID", 404));
        }
        if (popOptions) {
            var MyFunds = doc.MyFunds;
            var user_Transactions = doc.User_Transactions;
        }

        return res.status(200).json({
            status: "success",
            data: doc,
            MyFunds,
            user_Transactions,
        });
    });

export const getAll = (Model) =>
    catchAsync(async(req, res, next) => {
        // To allow for nested GET reviews on tour (hack)
        // let filter = {};
        // if (req.params.tourId) filter = { tour: req.params.tourId };

        // const features = new APIFeatures(Model.find(filter), req.query)
        //     .filter()
        //     .sort()
        //     .limitFields()
        //     .paginate();
        // const doc = await features.query.explain();
        const doc = await Model.find();

        // SEND RESPONSE
        res.status(200).json({
            status: "success",
            results: doc.length,
            data: {
                data: doc,
            },
        });
    });
export const Filtered = (Model) =>
    catchAsync(async(req, res, next) => {
        console.log(req.query);
        const doc = await Model.find(req.query);
        res.status(200).json({
            status: "success",
            results: doc.length,
            data: doc
        });
    });