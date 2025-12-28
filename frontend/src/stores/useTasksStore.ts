import { defineStore } from 'pinia';
import { ref, shallowRef } from 'vue';
import type { Status, Task } from '../../../shared/types';
import { useApi } from '../composables/useApi';

const URL = 'http://localhost:3000';

export const useTasksStore = defineStore('tasks', () => {
    const { requestApi, loading } = useApi();

    const tasksByStatus = ref<Record<Status, Task[]>>({
        backlog: [],
        'to-do': [],
        'in-progress': [],
        awaiting: [],
        done: [],
    });

    async function getUserTasks(userId: number) {
        try {
            const data = await requestApi<Task[]>(`${URL}/tasks/${userId}`);
            if (data) {
                const groupedTasks = data.reduce(
                    (acc, task) => {
                        const status = task.status || 'to-do';
                        acc[status] = acc[status] || [];
                        acc[status].push(task);
                        return acc;
                    },
                    {} as Record<Status, Task[]>,
                );
                tasksByStatus.value = groupedTasks;
            }
        } catch (error) {
            console.error('Error fetching tasks:', error);
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

    async function editTask(taskId: number, taskData: Partial<Task>) {
        try {
            await requestApi(`${URL}/tasks/${taskId}`, {
                method: 'PUT',
                body: JSON.stringify(taskData),
            });
        } catch (error) {
            throw new Error('Error editing task');
        }
    }

    const editingTask = shallowRef<Task | null>(null);
    const isManagingTask = ref<boolean>(false);

    function openTaskManager(task: Task) {
        editingTask.value = task;
        isManagingTask.value = true;
    }

    function closeTaskManager() {
        editingTask.value = null;
        isManagingTask.value = false;
    }

    return {
        tasksByStatus,
        loading,
        getUserTasks,
        deleteTask,
        editTask,
        editingTask,
        isManagingTask,
        openTaskManager,
        closeTaskManager
    };
});
