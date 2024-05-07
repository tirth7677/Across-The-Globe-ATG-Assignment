const express = require("express");
const router = express.Router();
const { likePostById, commentOnPostById } = require("../Controllers/likeAndcommentController");
const { validateToken } = require("../Middlewares/validateTokenHandler");

// Route to like a post by its ID
router.post("/like/:postId", validateToken, likePostById);

// Route to add a comment to a post by its ID
router.post("/comment/:postId", validateToken, commentOnPostById);

module.exports = router;