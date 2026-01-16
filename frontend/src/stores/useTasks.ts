import { defineStore } from 'pinia';
import { ref, shallowRef } from 'vue';
import type { Task } from '../../../shared/types';
import { useApi } from '../composables/useApi';

const URL = 'http://localhost:3000';

export const useTasksStore = defineStore('tasks', () => {
    const { requestApi } = useApi();

    const editingTask = shallowRef<Task | null>(null);
    const isManagingTask = ref(false);
    const managingMode = ref<'edit' | 'create' | null>(null);

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
        deleteTask,
        editTask,
    };
});
