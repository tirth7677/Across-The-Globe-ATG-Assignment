const mongoose = require("mongoose");

// Define the schema for a User
const UserSchema = new mongoose.Schema(
    {
        // Define the email field of the user
        email: {
            type: String, // Email is a string
            required: true, // Email is required
            unique: true, // Email must be unique
            trim: true, // Trim whitespace from email
            lowercase: true, // Convert email to lowercase
            // Validate email format using regex
            validate: {
                validator: function (value) {
                    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value); // Regex pattern for email validation
                },
                message: "Invalid email format", // Error message for invalid email format
            },
        },
        // Define the password field of the user
        password: {
            type: String, // Password is a string
            required: true, // Password is required
        },
    },
    { timestamps: true } // Include timestamps for createdAt and updatedAt
);
// Export the mongoose model for the User schema
module.exports = mongoose.model("User", UserSchema);