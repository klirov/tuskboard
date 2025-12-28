<template>
    <aside
        class="panel"
    >
        <header class="panel-header">
            <h2>Task Manage Panel</h2>
            <UiButton @click="emits('request:close')">Close</UiButton>
        </header>
        <TaskEditForm v-if="editingTask" :editingTask="editingTask" />
        <TaskCreatingForm v-else />
    </aside>
</template>

<script setup lang="ts">
import type { Task } from '../../../../shared/types';
import UiButton from '../atoms/UiButton.vue';
import TaskEditForm from './TaskEditForm.vue';

const props = defineProps<{ editingTask: Task | null }>();

const emits = defineEmits<{
    (e: 'request:close'): void;
}>();
</script>

<style scoped>
.panel {
    position: fixed;
    top: 0;
    width: 25%;
    height: 100vh;
    box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
    background-color: var(--color-bg);
    z-index: 1000;
}
.panel-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 1rem;

    background-color: var(--color-bg-secondary);
}
</style>
