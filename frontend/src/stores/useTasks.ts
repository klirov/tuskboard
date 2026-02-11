import { defineStore } from 'pinia';
import { ref, shallowRef } from 'vue';
import type { Task } from '../../../shared/types';
import { useApi } from '../composables/useApi';

const BACKEND_URL = 'http://localhost:3000';

export const useTasksStore = defineStore('tasks', () => {
    const { requestApi } = useApi();

    const editingTask = shallowRef<Task | null>(null);
    const isManagingTask = ref(false);
    const managingMode = ref<'edit' | 'create' | null>(null);

    async function createTask(task: Partial<Task>, boardId: number) {
        try {
            await requestApi(`${BACKEND_URL}/boards/${boardId}/tasks`, {
                method: 'POST',
                body: JSON.stringify(task),
            });
        } catch (e) {
            throw new Error(`Error creating task: ${e}`);
        }
    }

    async function editTask(taskData: Partial<Task>) {
        try {
            await requestApi(`${BACKEND_URL}/tasks/${taskData.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(taskData),
            });
        } catch (e) {
            throw new Error(`Error editing task: ${e}`);
        }
    }

    async function deleteTask(taskId: number) {
        try {
            await requestApi(`${BACKEND_URL}/tasks/${taskId}`, {
                method: 'DELETE',
            });
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    }

    function toggleCreatePanel() {
        if (isManagingTask.value) {
            closePanel();
            return;
        }
        editingTask.value = null;
        managingMode.value = 'create';
        isManagingTask.value = true;
    }

    function openEditPanel(task: Task) {
        editingTask.value = task;
        managingMode.value = 'edit';
        isManagingTask.value = true;
    }

    function closePanel() {
        editingTask.value = null;
        managingMode.value = null;
        isManagingTask.value = false;
    }

    function toggleTaskManager(task?: Task) {
        const isEditTaskUnavailable =
            editingTask.value?.id === task?.id &&
            managingMode.value === 'edit' &&
            isManagingTask.value;
        if (!task) {
            if (managingMode.value === 'create' && isManagingTask.value) {
                closePanel();
            } else {
                toggleCreatePanel();
            }
        } else {
            if (isEditTaskUnavailable) {
                closePanel();
            } else {
                openEditPanel(task);
            }
        }
    }

    return {
        editingTask,
        isManagingTask,
        toggleCreatePanel,
        toggleTaskManager,
        managingMode,
        createTask,
        editTask,
        deleteTask,
    };
});
