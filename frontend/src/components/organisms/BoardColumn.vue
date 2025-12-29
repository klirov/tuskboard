<template>
    <div class="column">
        <header class="title">
            <h2>{{ title }}</h2>
        </header>
        <h2 v-if="loading">{{ t('task.loading-tasks') }}...</h2>
        <h2 v-else-if="tasks.length === 0">{{ t('task.no-tasks-yet') }}...</h2>
        <draggable
            v-model="props.tasks"
            :group="'tasks'"
            :animation="250"
            item-key="id"
            @change="onChange"
            class="tasks-list"
        >
            <template #item="{ element }">
                <TaskCard
                    :task="element"
                    @request:edit="emits('request:edit', element)"
                />
            </template>
        </draggable>
    </div>
</template>

<script setup lang="ts">
import Draggable from 'vuedraggable';
import type { Status, Task } from '../../../../shared/types';
import TaskCard from '../organisms/TaskCard.vue';
import { useI18n } from 'vue-i18n';

const props = defineProps<{
    title: string;
    loading: boolean;
    status: Status;
    tasks: Task[];
}>();

const emits = defineEmits<{
    (e: 'request:edit', task: Task): void;
    (e: 'dnd:locally', data: { taskId: number; from: Status; to: Status }): void;
    (e: 'dnd:globally', task: { id: number; status: Status }): void;
}>();

const { t } = useI18n();

function onChange(e: any) {
    const { moved, added, removed } = e;

    if (moved) return;
    if (removed) return;
    if (added) {
        const task = added.element as Task;
        const newStatus = props.status.toLowerCase().replace(' ', '-') as Status;
        const oldStatus = task.status;

        if (newStatus === oldStatus) return;

        emits('dnd:locally', { taskId: task.id, from: oldStatus, to: newStatus });

        emits('dnd:globally', { id: task.id, status: newStatus });
    }
}
</script>

<style scoped>
.column {
    display: flex;
    flex-direction: column;
    align-items: center;

    color: var(--color-text);

    width: 100%;

    gap: 1rem;
}

.title {
    width: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5rem;

    border-radius: 0.5rem;

    box-shadow: 0 0 0 0.5px var(--color-border);
    background-color: var(--color-secondary);
}

.tasks-list {
    width: 100%;
    min-height: 5rem;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
}
</style>
