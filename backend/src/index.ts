import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { AppEnv } from '../../shared/types';
import { registerAuthRoutes } from './routes/auth';
import { registerUserRoutes } from './routes/users';
import { registerTasksRoutes } from './routes/tasks';
import { registerBoardsRoutes } from './routes/boards';

const app = new Hono<AppEnv>();

app.use(
    '*',
    cors({
        origin: 'http://localhost:5173',
        allowMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
        allowHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
    }),
);

registerAuthRoutes(app);
registerUserRoutes(app);
registerBoardsRoutes(app);
registerTasksRoutes(app);

export default app;
