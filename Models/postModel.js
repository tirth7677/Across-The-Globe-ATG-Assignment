const mongoose = require("mongoose");

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
                    ref: 'User', // Reference to the user who posted the comment
                },
                username: {
                    type: String,
                    required: true,
                },
                createdAt: {
                    type: Date,
                    default: Date.now,
                },
            }
        ],
        likes: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User', // Reference to the user who liked the post
                },
                username: {
                    type: String,
                    required: true,
                },
            }
        ],
        likesCount: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
