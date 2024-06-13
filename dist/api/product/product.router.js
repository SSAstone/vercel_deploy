"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const create_product_1 = __importStar(require("./controllers/create_product"));
const validation_1 = require("../../middleware/validation");
const auth_1 = require("../../middleware/auth");
const products_1 = require("../../validators/products");
const edit_product_1 = __importStar(require("./controllers/edit_product"));
const productRouter = (0, express_1.Router)();
productRouter.get("/:id?", create_product_1.allProducts);
productRouter.post("/:id?", auth_1.verifyAccessToken, (0, validation_1.validateRequest)(products_1.productsValidator), create_product_1.default);
productRouter.post("/:id", auth_1.verifyAccessToken, edit_product_1.default);
productRouter.delete("/:id", auth_1.verifyAccessToken, edit_product_1.deleteProduct);
exports.default = productRouter;
