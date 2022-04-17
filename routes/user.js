import express from "express";
const router = express.Router();
import { createUser, updateUser } from "../controllers/user";
router.post("/create-user", createUser);
router.put("/update-user", updateUser);
module.exports = router;