import { Hono } from 'hono';
import { AppEnv, Board } from '../../../shared/types';
import { pool } from '../db';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { fail, ok } from '../utils/apiResponse';

export function registerBoardsRoutes(app: Hono<AppEnv>) {
    app.get('/boards/:userId', async (c) => {
        const userId = c.req.param('userId');

        const [existing] = await pool.query<RowDataPacket[]>('SELECT id FROM users WHERE id = ?', [
            userId,
        ]);

        if (!existing.length) {
            return c.json(ok('User not found', 404));
        }

        const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM boards WHERE user_id = ?', [
            userId,
        ]);

        const boards = rows as Board[];

        return c.json(ok<Board[]>(boards));
    });
    app.post('/boards/:userId', async (c) => {
        const userId = c.req.param('userId');

        const [existing] = await pool.query<RowDataPacket[]>('SELECT id FROM users WHERE id = ?', [
            userId,
        ]);

        if (!existing.length) {
            return c.json(ok('User not found', 404));
        }

        const body = await c.req.json<Partial<Board>>();

        const title = body.title?.trim();
        const description = body.description?.trim() || null;
        const color = body.color?.trim() || null;
        const is_archived = Number(body.is_archived);
        const order = body.order || null;

        try {
            const [result] = await pool.query<ResultSetHeader>(
                'INSERT INTO boards (user_id, title, description, color, is_archived, `order`) VALUES (?, ?, ?, ?, ?, ?)',
                [userId, title, description, color, is_archived, order],
            );
            if (result.affectedRows === 1) {
                const [newRow] = await pool.query<RowDataPacket[]>(
                    'SELECT * FROM boards WHERE id = ? LIMIT 1',
                    [result.insertId],
                );
                return c.json(ok<Board>(newRow[0] as Board));
            }
        } catch (error) {
            return c.json(fail(`Failed to create board: ${String(error)}`, 500));
        }
    });
    app.delete('/boards/:boardId', async (c) => {
        const boardId = c.req.param('boardId');

        try {
            const [result] = await pool.query<ResultSetHeader>('DELETE FROM boards WHERE id = ?', [
                boardId,
            ]);

            if (result.affectedRows === 0) {
                c.json(fail('Board not found or already deleted', 404));
            }

            return c.json(ok(result));
        } catch {
            return c.json(fail('Failed to delete the board', 500));
        }
    });
}
