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
                v-for="(tag, index) in task?.tags"
                :key="index"
                :tag
            />
        </div>
        <small>Created: {{ task.created_at }}</small>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Task } from '../../../../shared/types';
import { makeHueFromId } from '../../utils/CardColor';
import TaskTag from '../atoms/TaskTag.vue';

const props = defineProps<{ task: Task }>();

const cardBackground = computed<string>(() => {
    const hue = makeHueFromId(props.task.id);
    return `hsl(${hue}, 70%, 85%)`;
});
</script>

<style scoped>
.task-card {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    padding: 1rem;
    border-radius: 0.5rem;
}
</style>
