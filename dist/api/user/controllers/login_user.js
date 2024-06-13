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
exports.loginUser = void 0;
const user_1 = __importDefault(require("../models/user"));
const response_1 = require("../../../lib/api_response/response");
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username_email, password } = req.body;
        console.log("🚀 ~ loginUser ~ username_email:", username_email);
        const emailIs = username_email.includes('@') ? username_email : undefined;
        const email = emailIs.includes('gmail') ? emailIs : undefined;
        const username = username_email.includes('@') ? !email ? username_email : undefined : username_email;
        if (!password || (!username && !email)) {
            return res.status(400).json(response_1.ApiResponse.errorResponse(400, 'Username or email or password is required'));
        }
        const findUser = yield user_1.default.findOne({ $or: [{ username }, { email }] });
        if (!findUser) {
            return res.status(400).json(response_1.ApiResponse.errorResponse(400, 'User not found'));
        }
        const userPasswordCorrect = findUser.isPasswordCorrect(password);
        if (!userPasswordCorrect) {
            return res.status(400).json(response_1.ApiResponse.errorResponse(400, 'Invalid credentials'));
        }
        if (!findUser.isVerified) {
            return res.status(400).json(response_1.ApiResponse.errorResponse(400, 'User not verified'));
        }
        findUser.refreshToken = findUser.generateRefreshToken();
        findUser.assessToken = findUser.generateAccessToken();
        yield findUser.save({ validateBeforeSave: false });
        res.status(201)
            .cookie('accessToken', findUser.assessToken)
            .cookie('refreshToken', findUser.refreshToken)
            .json(response_1.ApiResponse.response(201, 'Login successfully', {
            _id: findUser._id,
            createAt: findUser.createdAt,
            accessToken: findUser.generateAccessToken()
        }));
    }
    catch (error) {
        res.status(400).json(response_1.ApiResponse.errorResponse(400, 'Invalid credentials'));
    }
});
exports.loginUser = loginUser;
