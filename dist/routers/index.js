"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../api/user/controllers/user"));
const routes = [
    {
        path: '/user',
        controller: user_1.default
    },
    {
        path: '/',
        controller: (req, res) => {
            res.json({
                message: 'Hello World'
            });
        }
    },
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
