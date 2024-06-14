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
exports.imagesUpload = void 0;
const response_1 = require("../../../lib/api_response/response");
const upload_image_1 = __importDefault(require("../../../lib/utils/upload_image"));
const imagesUpload = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const file = {
            type: (_a = req === null || req === void 0 ? void 0 : req.file) === null || _a === void 0 ? void 0 : _a.mimetype,
            buffer: (_b = req === null || req === void 0 ? void 0 : req.file) === null || _b === void 0 ? void 0 : _b.buffer
        };
        const buildImage = yield (0, upload_image_1.default)(file, 'single');
        res.status(201).json(response_1.ApiResponse.response(201, 'Image uploaded', buildImage));
    }
    catch (err) {
        console.log(err);
        res.status(500).send(response_1.ApiResponse.errorResponse(500, 'An error occurred while uploading the image.'));
    }
});
exports.imagesUpload = imagesUpload;
