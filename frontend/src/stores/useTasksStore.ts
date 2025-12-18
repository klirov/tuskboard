import { defineStore } from 'pinia';
import { ref } from 'vue';
import { type Task } from '../../../shared/types'

export const useTasksStore = defineStore('tasks', () => {
    const tasks = ref<Task[]>([]);

    return {
        tasks,
    };
});
