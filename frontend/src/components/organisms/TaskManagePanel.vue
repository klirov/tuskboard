<template>
    <aside class="panel">
        <header class="panel-header">
            <h2>{{ t('panel.manage-panel') }}</h2>
            <UiButton @click="emits('request:close')">{{ t('close') }}</UiButton>
        </header>
        <TaskEditForm
            v-if="editingTask"
            :editingTask="editingTask"
            @submit="emits('task:edit', $event)"
            @deleteTask="emits('task:delete', $event)"
        />
        <TaskCreatingForm v-else />
    </aside>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import type { Task } from '../../../../shared/types';
import UiButton from '../atoms/UiButton.vue';
import TaskEditForm from './forms/TaskEditForm.vue';
import TaskCreatingForm from './forms/TaskCreatingForm.vue';

const props = defineProps<{ editingTask: Task | null }>();

const emits = defineEmits<{
    (e: 'task:edit', updatedTask: Task): void;
    (e: 'task:delete', taskId: number): void;
    (e: 'request:close'): void;
}>();

const { t } = useI18n();
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
