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
exports.allProducts = void 0;
const product_1 = __importDefault(require("../models/product"));
const response_1 = require("../../../lib/api_response/response");
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const product = yield product_1.default.create(data);
        console.log("🚀 ~ createProduct ~ product:", product);
        res.status(201).json(response_1.ApiResponse.response(201, 'Product created', product));
    }
    catch (error) {
        console.log(error);
    }
});
exports.default = createProduct;
const allProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g;
    try {
        const { page = 1, limit = 10 } = req.query;
        const options = {
            limit: parseInt(limit),
            skip: (parseInt(page) - 1) * parseInt(limit),
        };
        if ((_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id) {
            const id = (_b = req === null || req === void 0 ? void 0 : req.params) === null || _b === void 0 ? void 0 : _b.id;
            const findById = yield product_1.default.findOne({ _id: id });
            if (!findById) {
                return res.status(404).json(response_1.ApiResponse.response(404, 'Product not found'));
            }
            return res.status(200).json(response_1.ApiResponse.response(200, 'Product found', findById));
        }
        if ((_c = req === null || req === void 0 ? void 0 : req.query) === null || _c === void 0 ? void 0 : _c.ids) {
            const ids = (_d = req === null || req === void 0 ? void 0 : req.query) === null || _d === void 0 ? void 0 : _d.ids;
            const products = yield product_1.default.find({ _id: { $in: ids.split('/') } });
            return res.status(200).json(response_1.ApiResponse.response(200, 'products', products));
        }
        if ((_e = req === null || req === void 0 ? void 0 : req.query) === null || _e === void 0 ? void 0 : _e.barcode) {
            console.log("🚀 ~ allProducts ~ req?.query?.barcode:", (_f = req === null || req === void 0 ? void 0 : req.query) === null || _f === void 0 ? void 0 : _f.barcode);
            const barcode = (_g = req === null || req === void 0 ? void 0 : req.query) === null || _g === void 0 ? void 0 : _g.barcode;
            const products = yield product_1.default.findOne({ barcode: barcode });
            return res.status(200).json(response_1.ApiResponse.response(200, 'products', products));
        }
        const productData = yield product_1.default.aggregate([
            {
                $addFields: {
                    "searchId": { $toObjectId: "$categoryId" }
                }
            },
            {
                $lookup: {
                    from: "categories",
                    localField: "searchId",
                    foreignField: "_id",
                    as: "categoriesData"
                }
            },
            {
                $addFields: {
                    category: { $first: "$categoriesData" },
                }
            },
            {
                $unset: ["searchId", "categoriesData"]
            },
            { $skip: options.skip },
            { $limit: options.limit }
        ]);
        const totalProductsCount = yield product_1.default.countDocuments();
        res.status(200).json(response_1.ApiResponse.paginateResponse(200, 'products', productData, totalProductsCount, page, options.limit));
    }
    catch (error) {
        res.status(500).json(response_1.ApiResponse.errorResponse(500, 'Internal server error'));
    }
});
exports.allProducts = allProducts;
