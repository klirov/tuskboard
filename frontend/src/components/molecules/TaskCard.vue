<template>
    <div class="task-card">
        <header
            class="title-wrapper"
            :style="{ 'background-color': cardBackground }"
        >
            <h3>{{ task.title }}</h3>
        </header>
        <div class="card-content">
            <p v-if="task.description">{{ task.description }}</p>
            <div
                class="tags"
                v-if="task.tags?.length"
            >
                Tags:
                <TaskTag
                    v-for="(tag, index) in task.tags"
                    :key="index"
                    :tag
                />
            </div>
            <small>Created: {{ createdAt }}</small>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Task } from '../../../../shared/types';
import { makeHueFromId } from '../../utils/GenerateCardColors';
import TaskTag from '../atoms/TaskTag.vue';

const props = defineProps<{ task: Task }>();

const cardBackground = computed<string>(() => {
    const hue = makeHueFromId(props.task.id);
    return `hsl(${hue}, 70%, 85%)`;
});

const createdAt = computed<ReturnType<typeof Date>>(() => {
    return new Date(props.task.created_at).toLocaleString('en-US', {
        dateStyle: 'medium',
        timeStyle: 'medium',
    });
});
</script>

<style scoped>
.task-card {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    width: 100%;

    border-radius: 0.5rem;
    color: var(--color-text);
    background-color: var(--color-bg-secondary);
}

.title-wrapper {
    padding: 0.75rem;
    width: 100%;
    border-radius: inherit;
    color: var(--color-card-text);

    box-shadow: 0 3px 4px -2px rgba(0, 0, 0, 0.18);
}

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
</style>
