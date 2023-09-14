// Imports
import express from "express";
import {
    register,
    login
} from "../controllers/auth.js";

const router = express.Router();

// Routes
router.post("/register", register);
router.post("/login", login);

export default router;