import { defineStore } from 'pinia';
import { ref } from 'vue';
import { type PublicUser } from '../../../shared/types';

export const useUserStore = defineStore('user', () => {
    const user = ref<PublicUser | null>(null);

    return { user };
});
