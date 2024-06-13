"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_aggregate_paginate_v2_1 = __importDefault(require("mongoose-aggregate-paginate-v2"));
const storeProductsSchema = new mongoose_1.Schema({
    product: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    expired: {
        type: Date,
        required: true
    },
    manufactured: {
        type: Date,
        required: true
    },
    storePrice: {
        type: Number
    },
    discount: String || Number,
    batchNo: {
        type: String
    }
}, { timestamps: true });
storeProductsSchema.plugin(mongoose_aggregate_paginate_v2_1.default);
const Product = (0, mongoose_1.model)('Product', storeProductsSchema);
exports.default = Product;
