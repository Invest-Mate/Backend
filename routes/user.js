import express from "express";
const AppError = require("./../utils/appError");
const multer = require("multer"); //multer imported
// const upload = multer({ dest: "public/img/users" });
const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/img/users");
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split("/")[1];
        cb(null, `user-${req.body.id}-${Date.now()}.${ext}`);
    },
});
const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    } else {
        cb(new AppError("Not an image! Please upload only images.", 400), false);
    }
};
const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
});


const router = express.Router();
import {
    createUser,
    updateUser,
    pushCards,
    getUser,
    deleteUser,

} from "../controllers/user";
router.post("/create-user", createUser);
router.put("/update-user", upload.single('photo'), updateUser);
router.put("/push-cards", pushCards);
router.get("/get-user", getUser);
router.delete("/delete-user", deleteUser);
module.exports = router;