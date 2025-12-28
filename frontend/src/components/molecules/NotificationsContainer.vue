<template>
    <TransitionGroup
        name="toast-slide"
        tag="div"
        class="toast-container"
    >
        <Toast
            v-for="notif in notifications"
            :key="notif.id"
            :notification="notif"
        />
    </TransitionGroup>
</template>

<script setup lang="ts">
import Toast from '../atoms/UiNotificationToast.vue';
import { useNotifications } from '../../composables/useNotifications';

const { notifications } = useNotifications();
</script>

<style scoped>
.toast-container {
    position: fixed;
    top: 1rem;
    right: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.toast-slide-enter-from,
.toast-slide-leave-to {
    transform: translateX(120%);
    opacity: 0;
}

.toast-slide-enter-active,
.toast-slide-leave-active {
    transition:
        transform 0.25s ease,
        opacity 0.25s ease;
}

.toast-slide-enter-to,
.toast-slide-leave-from {
    transform: translateX(0);
    opacity: 1;
}
</style>
