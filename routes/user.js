import express from "express"
import { login, logout, profile, register } from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

// ===================== AUth Routes ===================

// Register Route
router.post("/register", register);

// Login Route
router.post("/login", login);

// Logout Route
router.get("/logout", logout);

// Get Profile Route
router.get("/getProfile", isAuthenticated, profile);


// Export Router
export default router;