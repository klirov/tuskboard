<template>
    <aside class="panel">
        <header class="panel-header">
            <h2>Task Manage Panel</h2>
            <UiButton @click="emits('request:close')">Close</UiButton>
        </header>
        <TaskEditForm
            v-if="editingTask"
            :editingTask="editingTask"
            @submit="emits('editTask', $event)"
            @deleteTask="emits('deleteTask', $event)"
        />
        <TaskCreatingForm v-else />
    </aside>
</template>

<script setup lang="ts">
import type { Task } from '../../../../shared/types';
import UiButton from '../atoms/UiButton.vue';
import TaskEditForm from './TaskEditForm.vue';
import TaskCreatingForm from './TaskCreatingForm.vue';

const props = defineProps<{ editingTask: Task | null }>();

const emits = defineEmits<{
    (e: 'editTask', updatedTask: Task): void;
    (e: 'deleteTask', taskId: number): void;
    (e: 'request:close'): void;
}>();
</script>

<style scoped>
.panel {
    position: fixed;
    top: 0;
    width: 25%;
    height: 100vh;

    background-color: var(--color-bg);

    z-index: 1000;
}
.panel::after {
    content: '';
    position: absolute;
    right: 0;
    top: 0;
    width: 1px;
    height: 100%;
    background: var(--color-border);
    transform: scaleX(0.5);
    transform-origin: right;
    pointer-events: none;
}
.panel-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 1rem;

    background-color: var(--color-secondary);
}
.panel-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    gap: 1rem;

    padding: 1rem;
}
</style>
