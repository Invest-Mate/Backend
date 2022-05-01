import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError";
import user from "../models/user.js";
import APIFeatures from "../utils/apiFeatures";

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
        if (req.file) req.body.photo = req.file.filename;
        // const data = {};
        var proofsArray = [];
        // console.log(req.files);
        // data.imageCover = req.files.imageCover.originalname;
        if (Model != user) {
            if (req.files.proofs != undefined) {
                req.files.proofs.map((proof) => proofsArray.push(proof.filename));
                req.body.proofs = proofsArray;
            }
            // console.log(req.body.proofs);
            if (req.files.imageCover)
                req.body.imageCover = req.files.imageCover[0].filename;
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
        let query = Model.findById(req.params.id).populate(popOptions).select("-__v");
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
            user_Transactions
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