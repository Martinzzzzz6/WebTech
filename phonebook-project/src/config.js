"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
var convict = require("convict");
var dotenv = require("dotenv");
dotenv.config();
// const config: convict.Config<any> = convict({
//     uri: {
//     doc: "MongoDB URL",
//     env: "MONGODB_URI",
//   },
//   port: {
//     env: "PORT",
//     format: "port",
//     default: 3000,
//   },
// });
var config = convict({
    uri: {
        doc: "MongoDB URL",
        env: "MONGODB_URI",
    },
    port: {
        env: "PORT",
        format: "port",
        default: 3000,
    },
});
exports.config = config;
config.validate();
