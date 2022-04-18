import express from "express";
const router = express.Router();
import {
    createUser,
    updateUser,
    pushCards,
    getUser,
    deleteUser,
} from "../controllers/user";
router.post("/create-user", createUser);
router.put("/update-user", updateUser);
router.put("/push-cards", pushCards);
router.get("/get-user", getUser);
router.delete("/delete-user", deleteUser);
module.exports = router;