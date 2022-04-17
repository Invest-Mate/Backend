import User from "../models/user";
import moment from "moment";

export const createUser = async(req, res) => {
    const { name, dob, address, email, aadhar, contact, ip } = req.body;
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
    });
    try {
        await user.save();
        return res.json({
            success: "Successfully registered",
            data: { user }
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
        const data = {}; //Creating a storage to store object

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

        let user = await User.findByIdAndUpdate(req.body._id, data, { new: true });
        //In data variable the variable you are using should be same as that of model
        // console.log('udpated user', user)

        res.json(user);
    } catch (err) {
        if (err.code == 11000) {
            return res.json({ error: "Duplicate username" });
        }
        console.log(err);
    }
};