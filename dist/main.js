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
const dotenv_1 = __importDefault(require("dotenv"));
const mongodb_connect_1 = __importDefault(require("./lib/utils/mongodb_connect"));
dotenv_1.default.config();
const app_1 = __importDefault(require("./app"));
const port = process.env.PORT || 3000;
console.log(process.env.NODE_ENV);
app_1.default.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, mongodb_connect_1.default)();
    console.log(`Example app listening at http://localhost:${port}`);
}));
