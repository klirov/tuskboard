import type { Task } from '../../../../shared/types';
import { apiRequest } from '../../core/api';

export const tasksApi = {
    getByBoard: (boardId: number) => apiRequest<Task[]>(`/tasks/${boardId}`),

    create: (boardId: number, task: Partial<Task>) =>
        apiRequest<Task>(`/boards/${boardId}/tasks`, {
            method: 'POST',
            body: JSON.stringify(task),
        }),

    update: (task: Partial<Task>) =>
        apiRequest<Task>(`/tasks/${task.id}`, {
            method: 'PUT',
            body: JSON.stringify(task),
        }),

    delete: (taskId: number) => apiRequest<void>(`/tasks/${taskId}`, { method: 'DELETE' }),
};
