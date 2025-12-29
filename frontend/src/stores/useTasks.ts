import { defineStore } from 'pinia';
import { ref, shallowRef } from 'vue';
import type { Task } from '../../../shared/types';
import { useApi } from '../composables/useApi';

const URL = 'http://localhost:3000';

export const useTasksStore = defineStore('tasks', () => {
    const { requestApi } = useApi();

    const editingTask = shallowRef<Task | null>(null);
    const isManagingTask = ref<boolean>(false);

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

    function toggleTaskManager(task?: Task) {
        if (!task) {
            editingTask.value = null;
            isManagingTask.value = false;
        }

        if (editingTask.value?.id === task?.id) {
            editingTask.value = null;
            isManagingTask.value = false;
            return;
        }

        editingTask.value = task || null;
        isManagingTask.value = true;
        return;
    }

    return {
        editingTask,
        isManagingTask,
        toggleTaskManager,
        deleteTask,
        editTask,
    };
});
