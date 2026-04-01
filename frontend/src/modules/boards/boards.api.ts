import type { Board } from '../../../../shared/types';
import { apiRequest } from '../../core/api';

export const boardsApi = {
    getAllByUser: (userId: number) => apiRequest<Board[]>(`/boards/${userId}`),

    create: (userId: number, boardData: Partial<Board>) =>
        apiRequest<Board>(`/boards/${userId}`, {
            method: 'POST',
            body: JSON.stringify(boardData),
        }),

    update: (boardData: Partial<Board>) =>
        apiRequest<Board>(`/boards/${boardData.id}`, {
            method: 'PUT',
            body: JSON.stringify(boardData),
        }),

    delete: (boardId: number) =>
        apiRequest<void>(`/boards/${boardId}`, {
            method: 'DELETE',
        }),
};
