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
exports.fetchUser = void 0;
const user_1 = __importDefault(require("../models/user"));
const response_1 = require("../../../lib/api_response/response");
const fetchUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const decodedToken = req === null || req === void 0 ? void 0 : req.user;
        const user = yield user_1.default.findById(decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken._id).select("-password -assessToken -refreshToken");
        if (!user) {
            return res.status(401).json(response_1.ApiResponse.errorResponse(401, "Invalid access token"));
        }
        return res.status(200).json(response_1.ApiResponse.response(200, "User successfully fetched", user));
    }
    catch (error) {
        console.log(error);
    }
});
exports.fetchUser = fetchUser;
