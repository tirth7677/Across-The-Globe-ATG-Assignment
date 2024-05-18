const express = require("express");
const https = require("https");
const fs = require("fs");
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

const port = process.env.PORT || 3000;

// Route handlers
app.use("/v1/api/auth", authRouter);
app.use("/v1/api/post", postRouter);
app.use("/v1/api/likeAndcomment", likeAndcommentRouter);

// SSL/TLS certificate files
const privateKey = fs.readFileSync("path/to/your/private-key.pem", "utf8");
const certificate = fs.readFileSync("path/to/your/certificate.pem", "utf8");
const ca = fs.readFileSync("path/to/your/ca.pem", "utf8");

const credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca,
};

// Start the HTTPS server
const httpsServer = https.createServer(credentials, app);

httpsServer.listen(port, () => {
    console.log(`HTTPS Server running on port ${port}`);
    // Connect to the database
    connectDb();
    console.log("Connected to the database");
});