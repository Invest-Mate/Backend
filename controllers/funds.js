import Fund from "../models/funds";

export const createFund = async(req, res) => {
    const {
        title,
        category,
        createdBy,
        description,
        projectedAmount,
        ip,
        lastDate,
    } = req.body;
    const exists = await Fund.findOne({ title });
    if (exists)
        return res.json({
            error: "Title is already taken for another fund",
        });
    const fund = new Fund({
        title,
        category,
        createdBy,
        description,
        projectedAmount,
        ip,
        lastDate,
    });
    try {
        await fund.save();
        return res.json({
            success: "Fund created Successfully",
            fund,
        });
    } catch (e) {
        return res.json({
            error: "Failed",
            message: e.message,
        });
    }
};
export const updateFund = async(req, res) => {
    try {
        // console.log("profile update req.body", req.body);
        // console.log(req.files);
        const data = {};
        var proofsArray = [];
        // data.imageCover = req.files.imageCover.originalname;
        req.files.proofs.map(proof => proofsArray.push(proof.originalname));
        data.proofs = proofsArray
            // console.log(req.body.proofs);
        data.imageCover = req.body.imageCover;
        if (req.body.title) {
            data.title = req.body.title;
        }
        if (req.body.description) {
            data.description = req.body.description;
        }
        if (req.body.category) {
            data.category = req.body.category;
        }
        if (req.body.projectedAmount) {
            data.projectedAmount = req.body.projectedAmount;
        }
        if (req.body.lastDate) {
            data.lastDate = req.body.lastDate;
        }

        let user = await Fund.findByIdAndUpdate(req.body._id, data, { new: true });
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
export const deleteFund = async(req, res) => {
    try {
        let data = await Fund.findByIdAndDelete(req.body._id);
        return res.json({
            success: "Successfully Deleted the fund",
            data,
        });
    } catch (e) {
        return res.json({
            error: "Something went wrong",
            message: e.message,
        });
    }
};