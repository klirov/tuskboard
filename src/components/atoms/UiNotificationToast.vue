<template>
    <div :class="['toast', `toast--${notification.status}`, 'transition-theme']">
        <p class="toast-title">{{ statusComputed }}</p>
        <p class="toast-message">{{ notification.message }}</p>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { AppNotification } from '../../composables/useNotifications';

const { notification } = defineProps<{ notification: AppNotification }>();

const statusComputed = computed<string>(() => {
    const s = notification.status;
    if (s === 'error') return 'Ошибка';
    else if (s === 'success') return 'Успешно';
    else return 'Информация';
});
</script>

<style scoped>
.toast {
    padding: 0.5rem;
    border-radius: 0.5rem;

    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 0.5rem;

    color: var(--color-text);
}
.toast--error {
    background-color: red;
}
.toast--success {
    background-color: green;
}
.toast--info {
    background-color: aquamarine;
}
.toast-title {
    font-size: 0.875rem;
}
.toast-message {
    font-size: 0.75rem;
}
</style>
