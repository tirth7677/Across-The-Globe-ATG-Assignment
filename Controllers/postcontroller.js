const Post = require("../Models/postModel");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });
const sharp = require("sharp");


// Function to handle creating a new post
const createPost = async (req, res) => {
    try {
        // Extract post data from the request body
        const { title, content } = req.body;
        const image = req.file.buffer;

        if (!title || !content) {
            return res.status(400).json({
                success: false,
                message: "Title and content are required",
            });
        }
        imageBuffer = await sharp(image).resize(450, 450).toBuffer();
        // Create a new post object
        const newPost = new Post({
            title,
            content,
            image: imageBuffer,
        });

        // Save the new post to the database
        const data = await newPost.save();

        // Respond with success message and post data
        res.status(201).json({
            success: true,
            message: "New post created successfully",
            data,
        });
    } catch (error) {
        // Handle any errors that occur during the post creation process
        res.status(error.statusCode || 500).json({
            success: false,
            statusCode: error.statusCode || 500,
            message: error.message,
        });
    }
};

// Function to handle retrieving all posts
const getAllPosts = async (req, res) => {
    try {
        // Find all posts in the database
        const posts = await Post.find();

        // Count the total number of posts
        const totalPosts = await Post.countDocuments();

        // Respond with success message, total number of posts, and post data
        res.status(200).json({
            success: true,
            message: "All posts retrieved successfully",
            totalPosts,
            data: posts,
        });
    } catch (error) {
        // Handle any errors that occur during the post retrieval process
        res.status(error.statusCode || 500).json({
            success: false,
            statusCode: error.statusCode || 500,
            message: error.message,
        });
    }
};

// Function to handle retrieving a specific post by its ID
const getPostById = async (req, res) => {
    try {
        // Extract post ID from the request parameters
        const { postId } = req.params;

        // Find the post with the provided ID
        const post = await Post.findById(postId);

        // If post not found, return error
        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found",
            });
        }

        // Respond with success message and post data
        res.status(200).json({
            success: true,
            message: "Post retrieved successfully",
            data: post,
        });
    } catch (error) {
        // Handle any errors that occur during the post retrieval process
        res.status(error.statusCode || 500).json({
            success: false,
            statusCode: error.statusCode || 500,
            message: error.message,
        });
    }
};

// Function to handle updating a post by its ID
const updatePost = async (req, res) => {
    try {
        // Extract post ID from the request parameters
        const { postId } = req.params;

        // Extract updated post data from the request body
        const { title, content} = req.body;
        const image = req.file.buffer;

        imageBuffer = await sharp(image).resize(450, 450).toBuffer();
        // Find the post with the provided ID and update its data
        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            {
                title,
                content,
                image: imageBuffer,
            },
            { new: true }
        );

        // If post not found, return error
        if (!updatedPost) {
            return res.status(404).json({
                success: false,
                message: "Post not found",
            });
        }

        // Respond with success message and updated post data
        res.status(200).json({
            success: true,
            message: "Post updated successfully",
            data: updatedPost,
        });
    } catch (error) {
        // Handle any errors that occur during the post update process
        res.status(error.statusCode || 500).json({
            success: false,
            statusCode: error.statusCode || 500,
            message: error.message,
        });
    }
};

// Function to handle deleting a post by its ID
const deletePost = async (req, res) => {
    try {
        // Extract post ID from the request parameters
        const { postId } = req.params;

        // Find the post with the provided ID and delete it
        const deletedPost = await Post.findByIdAndDelete(postId);

        // If post not found, return error
        if (!deletedPost) {
            return res.status(404).json({
                success: false,
                message: "Post not found",
            });
        }

        // Respond with success message and deleted post data
        res.status(200).json({
            success: true,
            message: "Post deleted successfully and below shown data is the data that you choose to delete.",
            data: deletedPost,
        });
    } catch (error) {
        // Handle any errors that occur during the post deletion process
        res.status(error.statusCode || 500).json({
            success: false,
            statusCode: error.statusCode || 500,
            message: error.message,
        });
    }
};

// Export createPost, getPostById, updatePost, and deletePost functions for use in other modules
module.exports = { createPost, getPostById, updatePost, deletePost, upload ,getAllPosts };