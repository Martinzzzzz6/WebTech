import express from "express";
import { connectToDatabase } from "./services/database.services";
import { usersRouter } from "./routes/users.routes";

const app = express();
const port = 8080;

connectToDatabase()
    .then(() => {
        app.use("/users", usersRouter);

        // start the Express server
        app.listen(port, () => {
            console.log(`Server started at http://localhost:${port}`);
        });
    })
    .catch((error: Error) => {
        console.error("Database connection failed", error);
        process.exit();
    });