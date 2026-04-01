import { computed, ref } from 'vue';
import type { Status, Task } from '../../../../shared/types';
import { tasksApi } from './tasks.api';

export function useTasks(boardId: number) {
    const tasks = ref<Task[]>([]);
    const loading = ref(false);

    const tasksByStatus = computed<Record<Status, Task[]>>(() => {
        const map: Record<Status, Task[]> = {
            backlog: [],
            'to-do': [],
            'in-progress': [],
            awaiting: [],
            done: [],
            cancelled: [],
        };
        tasks.value.forEach((t: Task) => {
            if (t.status && map[t.status]) map[t.status].push(t);
        });
        return map;
    });

    async function getTasks() {
        if (!boardId) return;
        loading.value = true;

        try {
            tasks.value = await tasksApi.getByBoard(boardId);
        } catch (e) {
            throw new Error(`Error getting tasks: ${e}`);
        } finally {
            loading.value = false;
        }
    }

    async function createTask(task: Partial<Task>) {
        if (!boardId) return;
        try {
            await tasksApi.create(boardId, task);
            await getTasks();
        } catch (e) {
            throw new Error(`Error creating task: ${e}`);
        }
    }

    async function editTask(taskData: Partial<Task>) {
        try {
            await tasksApi.update(taskData);
        } catch (e) {
            throw new Error(`Error editing task: ${e}`);
        }
    }

    async function deleteTask(taskId: number) {
        try {
            await tasksApi.delete(taskId);
        } catch (e) {
            throw new Error(`Error deleting task: ${e}`);
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

    async function editStatus(taskId: Task['id'], status: Task['status']) {
        await editTask({ id: taskId, status });
        getTasks();
    }

    return {
        tasks,
        loading,
        tasksByStatus,
        createTask,
        editTask,
        deleteTask,
        getTasks,
        moveTasksLocally,
        editStatus,
    };
}
