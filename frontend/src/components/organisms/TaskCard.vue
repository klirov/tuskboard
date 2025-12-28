<template>
    <div
        class="task-card"
        @mouseenter="editButtonShown = true"
        @mouseleave="editButtonShown = false"
    >
        <TaskCardHeader
            :title="task.title"
            :background="cardBackground"
            :showEditButton="editButtonShown"
            @request:edit="emits('request:edit', task)"
        />

        <TaskCardContent
            :task="task"
            :createdAt="createdAt"
        />
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import type { Task } from '../../../../shared/types';
import { makeHueFromId } from '../../utils/GenerateCardColors';
import TaskCardHeader from '../molecules/TaskCardHeader.vue';
import TaskCardContent from '../molecules/TaskCardContent.vue';

const props = defineProps<{ task: Task }>();

const emits = defineEmits<{
    (e: 'request:edit', task: Task): void;
}>();

const editButtonShown = ref<boolean>(false);

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
</style>
