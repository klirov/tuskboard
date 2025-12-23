import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { registerUserRoutes } from './routes/users';
import { registerAuthRoutes } from './routes/auth';
import { AppEnv } from '../../shared/types';
import { registerTasksRoutes } from './routes/tasks';

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

registerUserRoutes(app);
registerAuthRoutes(app);
registerTasksRoutes(app);

export default app;
