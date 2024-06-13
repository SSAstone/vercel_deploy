import { Request, Response, Application, NextFunction } from 'express';
import userRouter from '../api/user/controllers/user';

interface RouteInterface {
    path: string;
    controller(req: Request, res: Response, next?: NextFunction): any;
}

const routes: Array<RouteInterface> = [
    {
        path: '/user',
        controller: userRouter
    },
    {
        path: '/',
        controller: (req: Request, res: Response) => {
            res.json({
                message: 'Hello World'
            });
        }
    },
    
];

const useRoutes = (app: Application): any => {
    routes.forEach((route: RouteInterface): void => {
        if (route.path === '/') {
            app.get(route.path, route.controller);
        } else {
            app.use(route.path, route.controller);
        }
    });
};

export default useRoutes;
