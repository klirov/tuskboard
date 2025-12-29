import { computed, ref } from 'vue';
import { useApi } from './useApi';
import { useNotifications } from './useNotifications';
import type { Status, Task } from '../../../shared/types';

const URL = 'http://localhost:3000';

export function useBoardTasks(boardId: number) {
    const { requestApi } = useApi();
    const { showNotification } = useNotifications();

    const id = computed(() => {
        const id = Number(boardId);
        return isNaN(id) ? null : id;
    });

    const tasks = ref<Task[]>([]);
    const loading = ref(false);

    const tasksByStatus = computed<Record<Status, Task[]>>(() => {
        const map: Record<Status, Task[]> = {
            backlog: [],
            'to-do': [],
            'in-progress': [],
            awaiting: [],
            done: [],
        };
        tasks.value.forEach((t) => {
            if (t.status && map[t.status]) map[t.status].push(t);
        });
        return map;
    });

    async function loadTasks() {
        if (!id.value) return;

        loading.value = true;
        try {
            tasks.value = await requestApi<Task[]>(`${URL}/tasks/${id.value}`);
        } catch (e) {
            showNotification('error', 'Failed to load tasks');
        } finally {
            loading.value = false;
        }
    }

    function moveTasksLocally({ taskId, from, to }: { taskId: number; from: Status; to: Status }) {
        const fromArr = tasksByStatus.value[from];
        const toArr = tasksByStatus.value[to];

        const index = fromArr.findIndex((t) => t.id === taskId);
        if (index === -1) return;

        const [task] = fromArr.splice(index, 1);
        if (!task) return;
        task.status = to;
        toArr.unshift(task);
    }

    return {
        boardId,
        tasks,
        tasksByStatus,
        loading,
        loadTasks,
        moveTasksLocally,
    };
}
