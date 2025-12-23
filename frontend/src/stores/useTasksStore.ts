import { defineStore } from 'pinia';
import { ref } from 'vue';
import { type Task } from '../../../shared/types';

const URL = 'http://localhost:3000';

export const useTasksStore = defineStore('tasks', () => {
    const tasks = ref<Task[]>([]);
    const loading = ref<boolean>(false);

    async function getUserTasks(userId: number) {
        loading.value = true;

        try {
            const response = await fetch(`${URL}/${userId}`);
            if (response.ok) {
                const data = await response.json();
                tasks.value = data.data;
            }
        } catch {
            throw new Error('Failed to fetch tasks');
        } finally {
            loading.value = false;
        }
    }

    return {
        tasks,
        loading,
        getUserTasks
    };
});
