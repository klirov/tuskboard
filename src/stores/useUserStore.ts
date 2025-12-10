import { defineStore } from 'pinia';
import { ref } from 'vue';

export type User = {
    id: number;
    email: string;
    created_at: string;
};

export const useUserStore = defineStore('user', () => {
    const user = ref<User | null>(null);

    return { user };
});
