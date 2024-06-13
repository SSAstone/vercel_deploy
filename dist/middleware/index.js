"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.notFound = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const defaultMiddleware = [
    (0, cors_1.default)({
        origin: ['http://192.168.0.105:3000', 'http://localhost:3000', 'https://e-commerce-three-green.vercel.app', '*'],
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        credentials: true
    }),
    express_1.default.json(),
    express_1.default.urlencoded({ extended: true }),
    (0, morgan_1.default)('dev'),
];
const productionMiddleware = [];
const developmentMiddleware = [];
function useMiddleware(app) {
    let middleware;
    if (process.env.NODE_ENV !== 'production') {
        middleware = [...defaultMiddleware, ...developmentMiddleware];
    }
    else {
        middleware = [...defaultMiddleware, ...productionMiddleware];
    }
    middleware.forEach((mw) => app.use(mw));
}
function notFound(req, res, next) {
    res.status(404);
    const error = new Error(`- Not Found - ${req.originalUrl}`);
    next(error);
}
exports.notFound = notFound;
function errorHandler(err, req, res, next) {
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    res.status(statusCode);
    res.json({
        message: err.message,
    });
}
exports.errorHandler = errorHandler;
exports.default = useMiddleware;
