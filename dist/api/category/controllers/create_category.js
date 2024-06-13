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
exports.allCategory = exports.createCategory = void 0;
const category_1 = __importDefault(require("../models/category"));
const response_1 = require("../../../lib/api_response/response");
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, _id, image } = req.body;
        if (_id) {
            const categories = yield category_1.default.findByIdAndUpdate(_id, { name, image });
            res.status(201).json(response_1.ApiResponse.response(201, 'Category updated', categories));
        }
        else {
            const categories = yield category_1.default.create({ name, image });
            res.status(201).json(response_1.ApiResponse.response(201, 'Category created', categories));
        }
    }
    catch (error) {
        res.status(500).json(response_1.ApiResponse.errorResponse(500, 'Internal server error'));
    }
});
exports.createCategory = createCategory;
const allCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield category_1.default.find();
        res.status(200).json(response_1.ApiResponse.response(200, 'Categories', categories));
    }
    catch (error) {
        res.status(500).json(response_1.ApiResponse.errorResponse(500, 'Internal server error'));
    }
});
exports.allCategory = allCategory;
