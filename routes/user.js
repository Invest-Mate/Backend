import express from "express";
const router = express.Router();
import { createUser } from "../controllers/user";
router.post("/create-user", createUser);
module.exports = router;