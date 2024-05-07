const express = require("express");
const cors = require("cors");
const connectDb = require("./Config/dbconnection.js");
const dotenv = require("dotenv");
const authRouter = require("./Routes/authRoutes.js");
const postRouter = require("./Routes/postRoutes.js");
const likeAndcommentRouter = require("./Routes/likeAndcommentRoutes.js");

const app = express();

// Enable CORS for all origins
app.use(cors((origin = "http://localhost:3000")));

// Parse incoming requests with JSON payloads
app.use(express.json());

// Load environment variables from .env file
dotenv.config();

const port = process.env.PORT;

// Route handlers
app.use("/v1/api/auth", authRouter);
app.use("/v1/api/post", postRouter);
app.use("/v1/api/likeAndcomment", likeAndcommentRouter);

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    // Connect to the database
    connectDb();
    console.log("Connected to the database");
});