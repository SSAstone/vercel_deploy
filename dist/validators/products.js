"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsValidator = void 0;
const zod_1 = require("zod");
const mongodb_1 = require("mongodb");
exports.productsValidator = zod_1.z.object({
    barcode: zod_1.z.string({ required_error: "Barcode is required." }).or(zod_1.z.number({ required_error: "Barcode is required." })),
    name: zod_1.z.string().min(3),
    price: zod_1.z.string({ required_error: "Price is required." }).or(zod_1.z.number({ required_error: "Price is required." })),
    status: zod_1.z.string().optional(),
    company: zod_1.z.string().optional(),
    brand: zod_1.z.string().optional(),
    model: zod_1.z.string().optional(),
    sku: zod_1.z.string().optional(),
    weight: zod_1.z.string().optional(),
    length: zod_1.z.string().optional(),
    width: zod_1.z.string().optional(),
    height: zod_1.z.string().optional(),
    origin: zod_1.z.string().optional(),
    unit: zod_1.z.string().optional(),
    tax: zod_1.z.string().optional(),
    discount: zod_1.z.string().optional(),
    stock: zod_1.z.string().optional(),
    description: zod_1.z.string().min(3).optional(),
    image: zod_1.z.any().optional(),
    categoryId: zod_1.z.string().optional().transform(value => new mongodb_1.ObjectId(value)),
    storeId: zod_1.z.string().optional().transform(value => new mongodb_1.ObjectId(value)),
});
