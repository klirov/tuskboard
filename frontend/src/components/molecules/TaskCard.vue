<template>
    <div
        class="task-card"
        :style="{ 'background-color': cardBackground }"
    >
        <h3>{{ task.title }}</h3>
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

const createdAt = computed<string>(() => {
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

    padding: 1rem;
    border-radius: 0.5rem;
    color: var(--text-color);
}
</style>
