import { defineStore } from 'pinia';
import { shallowRef } from 'vue';
import { type PublicUser } from '../../../../shared/types';

export const useAuthStore = defineStore('user', () => {
    const user = shallowRef<PublicUser | null>(null);

    return { user };
});
