import { defineStore } from 'pinia';
import { ref, shallowRef } from 'vue';
import type { Status, Task } from '../../../shared/types';
import { useApi } from '../composables/useApi';

const URL = 'http://localhost:3000';

export const useTasksStore = defineStore('tasks', () => {
    const { requestApi } = useApi();

    const tasksByStatus = ref<Record<Status, Task[]>>({
        backlog: [],
        'to-do': [],
        'in-progress': [],
        awaiting: [],
        done: [],
    });
    const loading = ref<boolean>(false);

    async function getUserTasks(userId: number) {
        loading.value = true;
        try {
            const data = await requestApi<Task[]>(`${URL}/tasks/${userId}`);
            if (data) {
                for (const status in tasksByStatus.value) {
                    tasksByStatus.value[status as Status] = [];
                }

                for (const task of data) {
                    const status = task.status || 'to-do';
                    tasksByStatus.value[status].push(task);
                }
            }
        } catch (error) {
            console.error('Error fetching tasks:', error);
        } finally {
            loading.value = false;
        }
    }

    async function deleteTask(taskId: number) {
        try {
            await requestApi(`${URL}/tasks/${taskId}`, {
                method: 'DELETE',
            });
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    }

    async function editTask(taskData: Partial<Task>) {
        try {
            await requestApi(`${URL}/tasks/${taskData.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(taskData),
            });
        } catch (error) {
            throw new Error('Error editing task');
        }
    }

    const editingTask = shallowRef<Task | null>(null);
    const isManagingTask = ref<boolean>(false);

    function toggleTaskManager(task?: Task) {
        isManagingTask.value = !isManagingTask.value;
        editingTask.value = task || null;
    }

    function moveTasksLocally(data: { taskId: number; from: Status; to: Status }) {
        const fromArr = tasksByStatus.value[data.from];
        const toArr = tasksByStatus.value[data.to];

        const index = fromArr.findIndex((t) => t.id === data.taskId);
        if (index === -1) return;

        const removed = fromArr.splice(index, 1);
        const task = removed[0];
        if (!task) return;

        task.status = data.to;
        toArr.unshift(task);
    }

    return {
        tasksByStatus,
        loading,
        getUserTasks,
        deleteTask,
        editTask,
        editingTask,
        isManagingTask,
        toggleTaskManager,
        moveTasksLocally,
    };
});
