"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpValidator = void 0;
const zod_1 = require("zod");
exports.OtpValidator = zod_1.z.object({
    email: zod_1.z.string().email({ message: "Invalid email format." }),
    otp: zod_1.z.string().min(4, { message: "Otp must be at least 6 characters long." }),
});
