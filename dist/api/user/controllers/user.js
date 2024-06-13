"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const express_1 = require("express");
const userRouter = (0, express_1.Router)();
const userSchema = new mongoose_1.Schema({
    username: {
        type: String,
        lowercase: true,
        index: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required.'],
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true
    },
    role: {
        type: String,
        enum: ['admin', 'user', 'business', 'dealer'],
        default: 'user'
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    refreshToken: {
        type: String
    },
    assessToken: {
        type: String
    }
}, { timestamps: true });
const User = (0, mongoose_1.model)('User', userSchema);
userRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User.find();
        res.json(users);
    }
    catch (error) {
        res.status(500).json("Error: " + error);
    }
}));
exports.default = userRouter;
