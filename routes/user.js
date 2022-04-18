import express from "express";
const router = express.Router();
import { createUser, updateUser, pushCards, getUser } from "../controllers/user";
router.post("/create-user", createUser);
router.put("/update-user", updateUser);
router.put("/push-cards", pushCards);
router.get("/get-user", getUser);
module.exports = router;