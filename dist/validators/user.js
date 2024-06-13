"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidator = exports.passwordValidator = exports.emailValidator = exports.userValidator = void 0;
const zod_1 = require("zod");
exports.userValidator = zod_1.z.object({
    email: zod_1.z.string().email({ message: "Invalid email format." }),
    username: zod_1.z.string().min(3),
    password: zod_1.z.string().min(6),
    role: zod_1.z.string().optional(),
    isVerified: zod_1.z.boolean().optional(),
    refreshToken: zod_1.z.string().optional(),
    assessToken: zod_1.z.string().optional(),
    isPasswordCorrect: zod_1.z.function(),
    generateAccessToken: zod_1.z.function(),
    generateRefreshToken: zod_1.z.function(),
    createdAt: zod_1.z.date().optional(),
});
exports.emailValidator = zod_1.z.object({
    email: zod_1.z.string().email({ message: "Invalid email format." })
});
exports.passwordValidator = zod_1.z.object({
    password: zod_1.z.string().min(6),
    confirmPassword: zod_1.z.string().min(6).optional(),
    email: zod_1.z.string().email({ message: "Invalid email format." }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
});
exports.loginValidator = zod_1.z.object({
    username_email: zod_1.z.string(),
    password: zod_1.z.string().min(6),
});
