const express = require("express");
const router = express.Router();
const { signUp, Login, test,resetPassword } = require("../Controllers/authController");
const { validateToken } = require("../Middlewares/validateTokenHandler");

// Route to handle user signup
router.post("/signup", signUp);

// Route to handle user login
router.post("/login", Login);

router.post("/reset-password", validateToken,resetPassword);

// Export the router
module.exports = router;