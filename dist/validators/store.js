"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeValidator = void 0;
const zod_1 = require("zod");
const mongodb_1 = require("mongodb");
exports.storeValidator = zod_1.z.object({
    name: zod_1.z.string().transform(value => new mongodb_1.ObjectId(value)),
    storeProducts: zod_1.z.array(zod_1.z.string().transform(value => new mongodb_1.ObjectId(value))),
    status: zod_1.z.string().optional(),
    discount: zod_1.z.string().optional(),
    description: zod_1.z.string().min(3).optional(),
    image: zod_1.z.any().optional(),
    storeCategoryId: zod_1.z.string().optional().transform(value => new mongodb_1.ObjectId(value)),
});
