const Post = require("../Models/postModel");

// Function to handle liking a post by its ID
const likePostById = async (req, res) => {
    try {
        // Extract post ID from the request parameters
        const { postId } = req.params;

        // Find the post by its ID
        let post = await Post.findById(postId);

        // If post not found, return error
        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found",
            });
        }

        // Get the user's username from the request object (assuming it's available in req.user.username)
        const username = req.user.username;

        // Check if the user has already liked the post
        const alreadyLiked = post.likes.some(like => like.username === username);
        if (alreadyLiked) {
            return res.status(400).json({
                success: false,
                message: "You have already liked this post",
            });
        }

        // Initialize likes array if it doesn't exist
        if (!post.likes) {
            post.likes = [];
        }

        // Add the user's username to the likes array
        post.likes.push({ username: username });

        // Increment the likes count
        post.likesCount++;

        // Save the updated post to the database
        await post.save();

        // Respond with success message
        res.status(200).json({
            success: true,
            message: "Post liked successfully",
        });
    } catch (error) {
        // Handle any errors that occur during the like process
        res.status(error.statusCode || 500).json({
            success: false,
            statusCode: error.statusCode || 500,
            message: error.message,
        });
    }
};


// Function to handle adding a comment to a post by its ID
const commentOnPostById = async (req, res) => {
    try {
        // Extract post ID from the request parameters
        const { postId } = req.params;

        // Find the post by its ID
        const post = await Post.findById(postId);

        // If post not found, return error
        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found",
            });
        }

        // Get the user's username from the request object (assuming it's available in req.user.username)
        const username = req.user.username;

        // Extract comment content from the request body
        const { content } = req.body;

        // Add the comment to the comments array
        post.comments.push({ content, username });

        // Save the updated post to the database
        await post.save();

        // Respond with success message
        res.status(200).json({
            success: true,
            message: "Comment added successfully",
        });
    } catch (error) {
        // Handle any errors that occur during the comment process
        res.status(error.statusCode || 500).json({
            success: false,
            statusCode: error.statusCode || 500,
            message: error.message,
        });
    }
};

module.exports = { likePostById, commentOnPostById };