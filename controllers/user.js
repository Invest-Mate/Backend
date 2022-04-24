import User from "../models/user";
import sharp from "sharp";
// const multer = require("multer");

import moment from "moment";

// export const uploadUserPhoto = (req, res, next) => {
//     upload.single("photo");
//     next();
// };

export const createUser = async(req, res) => {
    const { name, dob, address, email, aadhar, contact, ip, userId } = req.body;
    const exist = await User.findOne({ email });
    if (exist)
        return res.json({
            error: "Email is already taken",
        });

    const user = new User({
        name,
        dob,
        address,
        email,
        aadhar,
        contact,
        ip,
        userId
    });
    try {
        await user.save();
        return res.json({
            success: "Successfully registered",
            data: { user },
        });
    } catch (e) {
        return res.json({
            error: e.message,
        });
    }
};

export const pushCards = async(req, res) => {
    const { ac_name, card_no, expiry, id } = req.body;
    try {
        let user = await User.findByIdAndUpdate(
            id, {
                cards: [{
                    ac_name: ac_name,
                    card_no: card_no,
                    expiry: expiry,
                }, ],
            }, { new: true }
        );
        return res.json({
            success: `Successfully updated ${req.body.id}`,
            data: { user },
        });
    } catch (e) {
        return res.json({
            error: e.message,
        });
    }
};
export const updateUser = async(req, res) => {
    try {
        // console.log("profile update req.body", req.body);
        const data = {};
        data.photo = req.file.filename;

        if (req.body.name) {
            data.name = req.body.name;
        }
        if (req.body.dob) {
            data.dob = req.body.dob;
        }
        if (req.body.address) {
            data.address = req.body.address;
        }
        if (req.body.aadhar) {
            data.aadhar = req.body.aadhar;
        }
        if (req.body.contact) {
            data.contact = req.body.contact;
        }

        let user = await User.findByIdAndUpdate(req.body.id, data, { new: true });
        //In data variable the variable you are using should be same as that of model
        // console.log('udpated user', user)
        res.json({ user, data });
    } catch (err) {
        if (err.code == 11000) {
            return res.json({ error: "Duplicate username" });
        }
        console.log(err);
    }
};

export const getUser = async(req, res) => {
    // const { id } = req.body;
    try {
        let data = await User.find();
        return res.json({
            success: "Successfull",
            data,
        });
    } catch (e) {
        return res.json({
            error: "Unsuccessfull",
            message: e.message,
        });
    }
};

export const deleteUser = async(req, res) => {
    try {
        let data = await User.findByIdAndDelete(req.body.id);
        return res.json({
            success: "Successfully Deleted the user",
            data,
        });
    } catch (e) {
        return res.json({
            error: "Something went wrong",
            message: e.message,
        });
    }
};