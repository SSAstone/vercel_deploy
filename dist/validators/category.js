"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryValidator = void 0;
const zod_1 = require("zod");
exports.categoryValidator = zod_1.z.object({
    name: zod_1.z.string().min(3),
    image: zod_1.z.any(),
});
