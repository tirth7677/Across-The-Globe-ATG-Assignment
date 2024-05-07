const express = require("express");
const router = express.Router();
const { createPost, getPostById, updatePost, deletePost,upload,getAllPosts } = require("../Controllers/postcontroller");
const { validateToken } = require("../Middlewares/validateTokenHandler");

// Route to create a new post
router.post("/", validateToken,upload.single("image"), createPost);

// Route to get all posts
router.get("/", validateToken,getAllPosts);

// Route to get a specific post by its ID
router.get("/:postId", validateToken,getPostById);

// Route to update a post by its ID
router.patch("/:postId", validateToken,upload.single("image"), updatePost);

// Route to delete a post by its ID
router.delete("/:postId", validateToken, deletePost);

// Export the router
module.exports = router;