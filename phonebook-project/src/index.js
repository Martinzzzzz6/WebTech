"use strict";
// import express from 'express';
// import mongoose from 'mongoose';
// import userRoutes from './routers/UserRouter.js'; // Assuming you have defined your routes
Object.defineProperty(exports, "__esModule", { value: true });
// const app = express();
// import { config } from 'dotenv';
// config();
// console.log(process.env.DB_URI);
// // Middleware to parse JSON bodies
// app.use(express.json());
// // Connect to MongoDB
// mongoose.connect(process.env.DB_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
// .then(() => {
//     console.log('Connected to MongoDB');
// })
// .catch((error) => {
//     console.error('Error connecting to MongoDB:', error);
//     process.exit(1); // Exit the process if unable to connect to the database
// });
// // Use user routes
// app.use('/api', userRoutes); // Prefix all user routes with '/api'
// // Start the Express server
// const port = process.env.PORT || 3000;
// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });
// // Close the MongoDB connection when the server is terminated
// process.on('SIGINT', async () => {
//     try {
//         await mongoose.connection.close();
//         console.log('Disconnected from MongoDB');
//         server.close();
//         process.exit(0);
//     } catch (error) {
//         console.error('Error closing MongoDB connection:', error);
//         process.exit(1);
//     }
// });
// import { config } from 'dotenv';
// import { connectToCluster as connectToClusterUploader, uploadData } from './dataUploader';
// import { MongoClient } from 'mongodb';
// // Load environment variables from .env file
// config();
// async function connectToCluster(uri: string): Promise<MongoClient> {
//     const client = new MongoClient(uri);
//     await client.connect();
//     return client;
// }
// async function main() {
//     // Connect to MongoDB Atlas cluster
//     const mongoClient = await connectToCluster(process.env.DB_URI || '');
//     try {
//         // Upload data to the database
//         await uploadData();
//     } catch (error) {
//         console.error('Failed to upload data:', error);
//     } finally {
//         // Close the MongoDB Atlas cluster connection
//         await mongoClient.close();
//         console.log('Connection to MongoDB Atlas closed');
//     }
// }
// // Call the main function
// main().catch(error => console.error('An error occurred:', error));
var express = require("express");
var json = express.json;
var mongoose_1 = require("mongoose");
var config_1 = require("./config");
var route_1 = require("./route");
var mongoURI = process.env.MONGODB_URI;
mongoose_1.default.connect(mongoURI).then(function () {
    console.log("Connected to MongoDB");
}).catch(function (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
});
var app = express();
var port = config_1.config.get('port');
app.use(json());
app.use(function (req, res, next) {
    console.log("[".concat(new Date().toISOString(), "] ").concat(req.method, " ").concat(req.url));
    next();
});
app.get("/", function (req, res) { return res.send("Hello world"); });
app.use("/users", route_1.userRouter);
app.listen(port);
console.log("Server started on port ", port);
