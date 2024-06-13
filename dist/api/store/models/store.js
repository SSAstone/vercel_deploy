"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_aggregate_paginate_v2_1 = __importDefault(require("mongoose-aggregate-paginate-v2"));
const storeSchema = new mongoose_1.Schema({
    name: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
    },
    storeProducts: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'StoreProducts'
        }],
    status: {
        type: String,
        enum: ['active', 'inactive', 'pending', 'deleted', 'blocked', 'canceled', 'completed'],
        default: 'pending'
    },
    storeCategoryId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'StoreCategory'
    },
    image: {
        type: String || Object || Array,
    },
    discount: String,
    description: String,
}, { timestamps: true });
storeSchema.plugin(mongoose_aggregate_paginate_v2_1.default);
const Product = (0, mongoose_1.model)('Product', storeSchema);
exports.default = Product;
