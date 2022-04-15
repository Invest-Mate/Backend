import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'A user must have a name'],
        maxlength: [40, 'A user name must have less or equal then 40 characters'],
        minlength: [10, 'A user name must have more or equal then 10 characters']
    },
    userId: {
        type: ObjectId,
        required: true,
    },
    dob: {
        type: Date,
    },
    address: {
        type: String,
        required: true,
    },
    email: {
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
    },
    contact: {
        type: String,
        required: true,
        max: 10,
        min: 10,
    },
    ip: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        default: "",
    },
}, { timestamps: true });

export default mongoose.model("User", userSchema);