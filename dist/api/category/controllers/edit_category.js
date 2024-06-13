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
exports.deleteCategory = exports.editCategory = void 0;
const response_1 = require("../../../lib/api_response/response");
const category_1 = __importDefault(require("../models/category"));
const editCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        const { _id } = req.params;
        const categories = yield category_1.default.findByIdAndUpdate(_id, { name });
        res.status(201).json(response_1.ApiResponse.response(201, 'Category updated', categories));
    }
    catch (error) {
        res.status(500).json(response_1.ApiResponse.errorResponse(500, 'Internal server error'));
    }
});
exports.editCategory = editCategory;
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const category = yield category_1.default.findByIdAndDelete(id);
        if (!category) {
            return res.status(404).json(response_1.ApiResponse.errorResponse(404, 'Category not found'));
        }
        res.status(200).json(response_1.ApiResponse.response(200, 'Category deleted', category));
    }
    catch (error) {
        res.status(500).json(response_1.ApiResponse.errorResponse(500, 'Internal server error'));
    }
});
exports.deleteCategory = deleteCategory;
