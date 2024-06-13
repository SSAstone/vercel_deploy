import express, { Application } from 'express';
import useMiddleware from './middleware';
import useRoutes from './routers';
import * as middleware from './middleware';
const app: Application = express();

useMiddleware(app);
useRoutes(app);

app.use(middleware.notFound);
app.use(middleware.errorHandler);

export default app;
