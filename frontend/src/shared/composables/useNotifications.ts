import { ref } from 'vue';

export type AppNotification = {
    id: string;
    status: AppNotificationStatus;
    message: string;
};

type AppNotificationStatus = 'error' | 'success' | 'info';

const notifications = ref<AppNotification[]>([]);

export function useNotifications() {
    function showNotification(status: AppNotificationStatus, message: string) {
        notifications.value.push({ id: crypto.randomUUID(), status, message });
        setTimeout(() => notifications.value.splice(0, 1), 3000);
    }

    return {
        showNotification,
        notifications,
    };
}
