import { RowDataPacket } from 'mysql2';
import { pool } from './db';
import { fail } from './utils/apiResponse';

export const requireBoardOwnership = async (c: any, next: () => Promise<void>) => {
    const user = c.get('user') as { id: number };
    const boardId = c.req.param('boardId');

    if (!boardId) return c.json(fail('Board ID required', 400));

    const [rows] = await pool.query<RowDataPacket[]>(
        'SELECT id FROM boards WHERE id = ? AND user_id = ? LIMIT 1',
        [boardId, user.id],
    );

    if (!rows.length) {
        return c.json(fail('Board not found or not owned by you', 403));
    }

    await next();
};
