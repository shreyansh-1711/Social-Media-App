import express from "express";
import { login } from "../controllers/auth.js";

// Create an instance of Express Router
const router = express.Router();

// Define the route for login and associate it with the login controller function
router.post("/login", login);

// Export the router as the default export
export default router;
