import { Hono } from 'hono';
import { AppEnv, Task } from '../../../shared/types';
import { pool } from '../db';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { fail, ok } from '../utils/apiResponse';

export function registerTasksRoutes(app: Hono<AppEnv>) {
    app.get('/tasks/:boardId', async (c) => {
        const boardId = c.req.param('boardId');
        const user = c.get('user') as { id: number };

        const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM tasks WHERE board_id = ?', [
            boardId,
        ]);

        return c.json(ok<Task[]>(rows as Task[]));
    });

    app.post('/boards/:boardId/tasks', async (c) => {
        const boardId = Number(c.req.param('boardId'));

        const body = await c.req.json<Partial<Task>>();

        const title = body.title?.trim();
        const description = body.description?.trim() || null;
        const tags = body.tags ? JSON.stringify(body.tags) : null;
        const status = body.status || 'to-do';
        const order = body.order || null;

        try {
            const [result] = await pool.query<ResultSetHeader>(
                'INSERT INTO tasks (board_id, title, description, tags, status, `order`) VALUES (?, ?, ?, ?, ?, ?)',
                [boardId, title, description, tags, status, order],
            );
            if (result.affectedRows === 1) {
                const [newRow] = await pool.query<RowDataPacket[]>(
                    'SELECT * FROM tasks WHERE id = ?',
                    [result.insertId],
                );

                return c.json(ok<Task>(newRow[0] as Task));
            }
        } catch (error) {
            return c.json(fail('Failed to create task', 500));
        }
    });

    app.put('/tasks/:taskId', async (c) => {
        const taskId = c.req.param('taskId');

        const [rows] = await pool.query<RowDataPacket[]>(
            'SELECT t.* FROM tasks t JOIN boards b ON t.board_id = b.id WHERE t.id = ? LIMIT 1',
            [taskId],
        );

        const existingTask = rows[0] as Task;
        const body = await c.req.json<Partial<Task>>();

        const title = body.title?.trim() ?? existingTask.title;
        const description = body.description?.trim() ?? existingTask.description;
        const tags = body.tags ? JSON.stringify(body.tags) : JSON.stringify(existingTask.tags);
        const status = body.status ?? existingTask.status;

        try {
            const [result] = await pool.query<ResultSetHeader>(
                'UPDATE tasks SET title = ?, description = ?, tags = ?, status = ? WHERE id = ?',
                [title, description, tags, status, taskId],
            );
            if (result.affectedRows === 1) return c.json(ok(result));
        } catch (error) {
            console.error(error);
            return c.json(fail('Failed to update task', 500));
        }
    });

    app.delete('/tasks/:taskId', async (c) => {
        const taskId = c.req.param('taskId');

        const [existing] = await pool.query<RowDataPacket[]>(
            'SELECT id FROM tasks WHERE id = ? LIMIT 1',
            [taskId],
        );

        if (!existing.length) {
            return c.json(fail('Task not found', 404));
        }

        try {
            const [result] = await pool.query<ResultSetHeader>('DELETE FROM tasks WHERE id = ?', [
                taskId,
            ]);
            if (result.affectedRows === 1) return c.json(ok(result));
        } catch (error) {
            return c.json(fail('Failed to delete task', 500));
        }
    });
}
