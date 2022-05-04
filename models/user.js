import mongoose from "mongoose";
const { Schema } = mongoose;
const opts = {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
};
//To include virtuals in res.json(), you need to set the toJSON schema
// option to { virtuals: true }.
const userSchema = new Schema({
    _id: String,
    name: {
        type: String,
        trim: true,
        required: [true, "A user must have a name"],
        maxlength: [40, "A user name must have less or equal then 40 characters"],
        minlength: [10, "A user name must have more or equal then 10 characters"],
    },
    userId: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true,
    },
    email: {
        required: true,
        type: String,
        trim: true,
        unique: true,
        match: [
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
            "Please enter a valid email address",
        ],
    },
    aadhar: {
        type: String,
        required: true,
        unique: true,
        maxlength: [12, "Aadhar number cannot be greater than 12 characters"],
    },
    contact: {
        type: String,
        // required: true,
        max: [10, "Contact number cannot be greater than 10 characters"],
        min: 10,
    },
    ip: {
        type: String,
    },
    photo: {
        type: String,
        default: "http://res.cloudinary.com/fundzer-85/image/upload/v1651636348/xaqnrit2i1yb6xce8jwq.jpg",
    },
}, { timestamps: true }, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

//To create a virtual Population of field My Funds
userSchema.virtual('MyFunds', {
    ref: 'Fund',
    localField: '_id',
    foreignField: 'createdBy',
});
userSchema.virtual('User_Transactions', {
    ref: 'Transaction',
    localField: '_id',
    foreignField: 'userId',
});
export default mongoose.model("User", userSchema);