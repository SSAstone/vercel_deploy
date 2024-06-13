"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeProductsValidator = void 0;
const zod_1 = require("zod");
const mongodb_1 = require("mongodb");
exports.storeProductsValidator = zod_1.z.object({
    product: zod_1.z.string().transform(value => new mongodb_1.ObjectId(value)),
    stock: zod_1.z.number(),
    expired: zod_1.z.date(),
    manufactured: zod_1.z.date(),
    storePrice: zod_1.z.number().optional(),
    discount: zod_1.z.number().optional(),
    batchNo: zod_1.z.string().optional(),
});
