"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_router_1 = __importDefault(require("../api/user/user.router"));
const product_router_1 = __importDefault(require("../api/product/product.router"));
const category_router_1 = __importDefault(require("../api/category/category.router"));
const routes = [
    {
        path: '/user',
        controller: user_router_1.default
    },
    {
        path: '/',
        controller: (req, res) => {
            res.json({
                message: 'Hello World'
            });
        }
    },
    {
        path: '/product',
        controller: product_router_1.default
    },
    {
        path: '/category',
        controller: category_router_1.default
    }
];
const useRoutes = (app) => {
    routes.forEach((route) => {
        if (route.path === '/') {
            app.get(route.path, route.controller);
        }
        else {
            app.use(route.path, route.controller);
        }
    });
};
exports.default = useRoutes;
