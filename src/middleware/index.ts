import express, { Request, Response, NextFunction, Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';

const defaultMiddleware = [
    cors({
        origin: ['http://192.168.0.105:3000', 'http://localhost:3000', 'https://e-commerce-three-green.vercel.app', '*'],
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        credentials: true
    }),
    express.json(),
    express.urlencoded({ extended: true }),
    morgan('dev'),
    // cookieParser(),
];

const productionMiddleware: Array<any> = [];
const developmentMiddleware: Array<any> = [];

function useMiddleware(app: Application) {
    let middleware: Array<any>;
    if (process.env.NODE_ENV !== 'production') {
        middleware = [...defaultMiddleware, ...developmentMiddleware];
    } else {
        middleware = [...defaultMiddleware, ...productionMiddleware];
    }

    middleware.forEach((mw) => app.use(mw));
}

export default useMiddleware;
