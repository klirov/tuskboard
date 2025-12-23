import { Hono } from 'hono';
import { AppEnv, Task } from '../../../shared/types';
import { pool } from '../db';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { fail, ok } from '../utils/apiResponse';

export function registerTasksRoutes(app: Hono<AppEnv>) {
    app.get('/tasks/:userId', async (c) => {
        const userId = c.req.param('userId');

        const [existing] = await pool.query<RowDataPacket[]>(
            'SELECT id FROM users WHERE id = ? LIMIT 1',
            [userId],
        );

        if (!existing.length) {
            return c.json(fail('User not found', 404));
        }

        const [rows] = await pool.query<RowDataPacket[]>(
            'SELECT id, title, description, tags, status FROM tasks WHERE user_id = ? ORDER BY id',
            [userId],
        );

        return c.json(ok<Task[]>(rows as Task[]));
    });

    app.post('/tasks/:userId', async (c) => {
        const userId = c.req.param('userId');

        const [existing] = await pool.query<RowDataPacket[]>(
            'SELECT id FROM users WHERE id = ? LIMIT 1',
            [userId],
        );

        if (!existing.length) {
            return c.json(fail('User not found', 404));
        }

        const body = await c.req.json<Partial<Task>>();

        const title = body.title?.trim();
        const description = body.description?.trim() || null;
        const tags = body.tags ? JSON.stringify(body.tags) : null;
        const status = body.status || 'to-do';

        try {
            const [result] = await pool.query<ResultSetHeader>(
                'INSERT INTO tasks (user_id, title, description, tags, status) VALUES (?, ?, ?, ?, ?)',
                [userId, title, description, tags, status],
            );
            if (result.affectedRows === 1) return c.json(ok<Task>(body as Task));
        } catch (error) {
            return c.json(fail('Failed to create task', 500));
        }
    });
}
