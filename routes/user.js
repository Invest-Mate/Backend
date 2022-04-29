import express from "express";
const AppError = require("./../utils/appError");
import sharp from "sharp";
const multer = require("multer"); //multer imported
// const upload = multer({ dest: "public/img/users" });
const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
        console.log("Yes its and image")
        cb(null, true);
    } else {
        cb(new AppError("Not an image! Please upload only images.", 400), false);
    }
};

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
});

var resizeUserPhoto = async(req, res, next) => {
    console.log(req.file);
    if (!req.file) return next();

    req.file.filename = `user-${req.body.id}-${req.file.originalname}`;

    await sharp(req.file.buffer)
        .resize(500, 500)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`public/img/users/${req.file.filename}`);
    next();
};

const router = express.Router();
import {
    createUser,
    updateUser,
    pushCards,
    getUser,
    deleteUser,
    getAllUsers
} from "../controllers/user";
router.post("/create-user", createUser);
router.put("/update-user", upload.single("photo"), resizeUserPhoto, updateUser);
router.put("/push-cards", pushCards);
router.get("/get-user", getUser);
router.get("/get-all-users", getAllUsers);
router.delete("/delete-user", deleteUser);
module.exports = router;