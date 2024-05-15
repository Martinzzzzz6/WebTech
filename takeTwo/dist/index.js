"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_services_1 = require("./services/database.services");
const users_routes_1 = require("./routes/users.routes");
const app = express_1.default();
const port = 8080; // default port to listen
database_services_1.connectToDatabase()
    .then(() => {
    // send all calls to /games to our gamesRouter
    app.use("/users", users_routes_1.usersRouter);
    // start the Express server
    app.listen(port, () => {
        console.log(`Server started at http://localhost:${port}`);
    });
})
    .catch((error) => {
    console.error("Database connection failed", error);
    process.exit();
});
//# sourceMappingURL=index.js.map