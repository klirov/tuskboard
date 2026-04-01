import { ref, shallowRef } from 'vue';
import { apiRequest } from '../../core/api';
import type { ActiveStatus, Board, Task } from '../../../../shared/types';
import { boardsApi } from '../boards/boards.api';
import { tasksApi } from '../tasks/tasks.api';

export function useArchive(userId: number) {
    const archivedBoards = shallowRef<Board[]>([]);
    const archivedTasks = shallowRef<Task[]>([]);
    const loading = ref(false);

    async function getArchive() {
        loading.value = true;
        try {
            const [boards, tasks] = await Promise.all([
                apiRequest<Board[]>(`/archive/boards/${userId}`),
                apiRequest<Task[]>(`/archive/tasks/${userId}`),
            ]);

            archivedBoards.value = boards || [];
            archivedTasks.value = tasks || [];
        } catch (e) {
            console.error('Failed to load archive:', e);
        } finally {
            loading.value = false;
        }
    }

    async function restoreBoard(board: Partial<Board>) {
        try {
            await boardsApi.update({ id: board.id, is_archived: false });
            await getArchive();
        } catch (error) {
            console.error('Failed to unarchive board: ', error);
        }
    }

    async function restoreTask(taskId: Task['id'], newStatus: ActiveStatus) {
        try {
            await tasksApi.update({ id: taskId, status: newStatus });
            await getArchive();
        } catch (error) {
            console.error('Failed to restore task: ', error);
        }
    }

    return { archivedBoards, archivedTasks, loading, getArchive, restoreBoard, restoreTask };
}
