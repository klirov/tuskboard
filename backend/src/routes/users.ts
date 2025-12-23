import { Hono } from 'hono';
import { RowDataPacket } from 'mysql2';
import { AppEnv, PublicUser } from '../../../shared/types';
import { pool } from '../db';
import { ok } from '../utils/apiResponse';

export function registerUserRoutes(app: Hono<AppEnv>) {
    //* Get all users

    app.get('/users', async (c) => {
        const [rows] = await pool.query<RowDataPacket[]>(
            'SELECT id, email, created_at FROM users ORDER BY id',
        );
        const users = rows as PublicUser[];
        return c.json(ok<PublicUser[]>(users));
    });
}
