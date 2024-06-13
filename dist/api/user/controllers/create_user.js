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
exports.createUser = void 0;
const user_1 = __importDefault(require("../models/user"));
const otp_1 = __importDefault(require("../models/otp"));
const response_1 = require("../../../lib/api_response/response");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, username } = req.body;
        if (!email || !password || !username) {
            return res.status(400).json(response_1.ApiResponse.errorResponse(400, 'Email and username and password is required'));
        }
        const findUser = yield user_1.default.findOne({
            $or: [{ email }, { username }]
        });
        if (findUser) {
            if (!findUser.isVerified) {
                const otp = yield otp_1.default.create({ email, otp: Math.floor(100000 + Math.random() * 900000).toString() });
                setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
                    yield otp_1.default.deleteOne({ email });
                    console.log('OTP deleted after one minutes');
                }), 1 * 60 * 1000);
                return res.status(201).json(response_1.ApiResponse.response(201, 'User is not verified send otp', otp));
            }
            return res.status(400).json(response_1.ApiResponse.errorResponse(400, 'User already exists'));
        }
        const user = yield user_1.default.create({
            email, password, username
        });
        if (!user) {
            return res.status(400).json(response_1.ApiResponse.errorResponse(400, 'User not created'));
        }
        const otp = yield otp_1.default.create({ email, otp: Math.floor(100000 + Math.random() * 900000).toString() });
        setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
            yield otp_1.default.deleteOne({ email });
            console.log('OTP deleted after one minutes');
        }), 1 * 60 * 1000);
        return res.status(201).json(response_1.ApiResponse.response(201, 'User created otp send', otp));
    }
    catch (error) {
        console.log(error);
    }
});
exports.createUser = createUser;
