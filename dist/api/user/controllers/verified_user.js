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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.verifiedUser = exports.sendOtp = void 0;
const user_1 = __importDefault(require("../models/user"));
const response_1 = require("../../../lib/api_response/response");
const otp_1 = __importDefault(require("../models/otp"));
const sendOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const findUser = yield user_1.default.findOne({ email });
        if (findUser) {
            return res.status(400).json(response_1.ApiResponse.errorResponse(400, 'This user already exists'));
        }
        const otp = yield otp_1.default.create({ email, otp: Math.floor(100000 + Math.random() * 900000).toString() });
        setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
            yield otp_1.default.deleteOne({ email });
            console.log('OTP deleted after one minutes');
        }), 1 * 60 * 1000);
        res.status(201).json(response_1.ApiResponse.response(201, 'send otp', otp));
    }
    catch (error) {
        console.log(error);
    }
});
exports.sendOtp = sendOtp;
const verifiedUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { otp, email } = req.body;
        const findOtp = yield otp_1.default.findOne({ otp, email });
        if (!findOtp) {
            return res.status(400).json(response_1.ApiResponse.errorResponse(400, 'Invalid otp'));
        }
        const user = yield user_1.default.findOne({ email: findOtp === null || findOtp === void 0 ? void 0 : findOtp.email });
        if (user) {
            user.isVerified = true;
            yield user.save();
            res.status(201).json(response_1.ApiResponse.response(201, 'User verified', user.email));
        }
        else {
            res.status(400).json(response_1.ApiResponse.errorResponse(400, 'User not found'));
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.verifiedUser = verifiedUser;
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { password, confirmPassword, email } = req.body;
        if (password !== confirmPassword) {
            res.status(400).json(response_1.ApiResponse.errorResponse(400, 'Password and confirm password does not match'));
        }
        ;
        const findUser = yield user_1.default.findOne({ email });
        if (!findUser) {
            return res.status(400).json(response_1.ApiResponse.errorResponse(400, 'User not found'));
        }
        ;
        if (!findUser.isVerified) {
            return res.status(400).json(response_1.ApiResponse.errorResponse(400, 'User not verified'));
        }
        ;
        findUser.password = password;
        yield findUser.save();
        res.status(201).json(response_1.ApiResponse.response(201, 'Password reset successfully'));
    }
    catch (error) {
        console.log(error);
    }
});
exports.resetPassword = resetPassword;
