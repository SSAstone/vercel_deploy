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
exports.deleteProduct = void 0;
const product_1 = __importDefault(require("../models/product"));
const response_1 = require("../../../lib/api_response/response");
const editProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, price, quantity, categoryId, image } = req.body;
        const { id } = req.params;
        console.log("🚀 ~ editProduct ~ id:", id);
    }
    catch (error) {
        res.status(500).json(response_1.ApiResponse.errorResponse(500, 'Internal server error'));
    }
});
exports.default = editProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const product = yield product_1.default.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json(response_1.ApiResponse.errorResponse(404, 'Product not found'));
        }
        res.status(200).json(response_1.ApiResponse.response(200, 'Product deleted', product));
    }
    catch (error) {
        res.status(500).json(response_1.ApiResponse.errorResponse(500, 'Internal server error'));
    }
});
exports.deleteProduct = deleteProduct;
