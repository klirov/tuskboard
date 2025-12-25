import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Status, Task } from '../../../shared/types';

const URL = 'http://localhost:3000';

export const useTasksStore = defineStore('tasks', () => {
    const tasksByStatus = ref<Record<Status, Task[]>>({
        'to-do': [],
        'in-progress': [],
        'awaiting': [],
        'done': [],
    });
    const loading = ref<boolean>(false);

    async function getUserTasks(userId: number) {
        loading.value = true;

        try {
            const response = await fetch(`${URL}/tasks/${userId}`);
            if (response.ok) {
                const res = await response.json();
                const groupedTasks = res.data.reduce(
                    (acc: Record<Status, Task[]>, task: Task) => {
                        const status = task.status || 'to-do';
                        acc[status] = acc[status] || [];
                        acc[status].push(task);
                        return acc;
                    },
                    {} as Record<Status, Task[]>,
                );
                tasksByStatus.value = groupedTasks;
            }
        } catch {
            throw new Error('Failed to fetch tasks');
        } finally {
            loading.value = false;
        }
    }

    return {
        tasksByStatus,
        loading,
        getUserTasks,
    };
});
