<template>
    <div class="card-content">
        <p v-if="task.description">{{ task.description }}</p>
        <div
            class="tags"
            v-if="task.tags?.length"
        >
            {{ t('task.tags') }}:
            <TaskTag
                v-for="(tag, index) in task.tags"
                :key="index"
                :tag
            />
        </div>
        <small>{{ t('task.created') }}: {{ createdAt }}</small>
    </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import type { Task } from '../../../../shared/types';
import TaskTag from '../atoms/TaskTag.vue';

const { t } = useI18n();

defineProps<{ task: Task; createdAt: string }>();
</script>

<style scoped>
.card-content {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    padding: 0.5rem 1rem;
}

.tags {
    display: flex;
    gap: 0.5rem;
    align-items: center;
}
small {
    font-size: 0.75rem;
}
</style>
