const mongoose = require("mongoose");

// Define the Post schema
const PostSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        content: {
            type: String,
            required: true,
            trim: true,
        },
        image: {
            type: Buffer,
        },
        comments: [
            {
                content: {
                    type: String,
                    required: true,
                    trim: true,
                },
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                    ref: 'User', // Reference to the user who posted the comment
                },
                createdAt: {
                    type: Date,
                    default: Date.now,
                },
            }
        ],
        likes: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);