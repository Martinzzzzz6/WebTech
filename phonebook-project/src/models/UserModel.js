"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var mongoose_1 = require("mongoose");
var UserSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    phone1: { type: String, required: true },
    phone2: { type: String },
    address: {
        country: { type: String, required: true },
        city: { type: String, required: true },
        street: { type: String, required: true },
        zip: { type: String, required: true },
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
}, {
    versionKey: false,
});
UserSchema.pre("save", function (next) {
    this.updatedAt = new Date();
    next();
});
exports.User = mongoose_1.default.model("User", UserSchema);
