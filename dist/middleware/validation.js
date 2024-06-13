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
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = void 0;
function validateRequest(val) {
    return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            const inputData = val.safeParse(req.body);
            if (!inputData.success) {
                const errorMessages = inputData.error.issues.map((issue) => issue.message);
                return res.status(400).json({ success: false, message: "Validation error", errors: errorMessages });
            }
            req.validatedData = inputData;
            next();
        }
        catch (error) {
            return res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    });
}
exports.validateRequest = validateRequest;
