"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_aggregate_paginate_v2_1 = __importDefault(require("mongoose-aggregate-paginate-v2"));
const productSchema = new mongoose_1.Schema({
    barcode: {
        type: String || Number,
        unique: true,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: String || Number,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'pending', 'deleted', 'blocked', 'canceled', 'completed'],
        default: 'pending'
    },
    categoryId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Category'
    },
    storeId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Store'
    },
    image: {
        type: String || Object || Array,
    },
    company: String,
    brand: String,
    model: String,
    sku: String,
    weight: String,
    length: String,
    width: String,
    height: String,
    origin: String,
    unit: String,
    tax: String,
    discount: String,
    stock: String,
    description: String
}, { timestamps: true });
productSchema.plugin(mongoose_aggregate_paginate_v2_1.default);
const Product = (0, mongoose_1.model)('Product', productSchema);
exports.default = Product;
