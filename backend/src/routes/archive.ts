import { Hono } from 'hono';
import { AppEnv } from '../../../shared/types';
import { pool } from '../db';
import { RowDataPacket } from 'mysql2';
import { fail, ok } from '../utils/apiResponse';

export function registerArchiveRoutes(app: Hono<AppEnv>) {
    app.get('/archive/boards/:userId', async (c) => {
        const userId = c.req.param('userId');

        const [existing] = await pool.query<RowDataPacket[]>(
            'SELECT * FROM users WHERE id = ? LIMIT 1',
            [userId],
        );

        if (!existing.length) return c.json(fail('Пользователь не найден', 404));

        const [boards] = await pool.query<RowDataPacket[]>(
            'SELECT * FROM boards WHERE user_id = ? AND is_archived = 1',
            [userId],
        );

        return c.json(ok(boards));
    });

    app.get('/archive/tasks/:userId', async (c) => {
        const userId = c.req.param('userId');

        const [existing] = await pool.query<RowDataPacket[]>(
            'SELECT * FROM users WHERE id = ? LIMIT 1',
            [userId],
        );

        if (!existing.length) return c.json(fail('Пользователь не найден', 404));

        const [tasks] = await pool.query<RowDataPacket[]>(
            `SELECT t.*, b.title as board_title FROM tasks t JOIN boards b ON t.board_id = b.id WHERE b.user_id = ? AND t.status IN ('done', 'cancelled')`,
            [userId],
        );

        return c.json(ok(tasks));
    });
}
