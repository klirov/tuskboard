<template>
    <aside class="panel">
        <header class="panel-header">
            <h2>{{ t('panel.manage-panel') }}</h2>
            <UiButton @click="emits('panel:close')">{{ t('close') }}</UiButton>
        </header>
        <BoardEditForm
            v-if="mode === 'edit'"
            :editingBoard="editingBoard"
            @board:edit="emits('board:edit', $event)"
            @board:delete="emits('board:delete', $event)"
        />
        <BoardCreateForm
            v-if="mode === 'create'"
            @board:create="emits('board:create', $event)"
        />
    </aside>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import type { Board } from '../../../../../shared/types';
import BoardEditForm from '../forms/BoardEditForm.vue';
import BoardCreateForm from '../forms/BoardCreateForm.vue';
import UiButton from '../../atoms/UiButton.vue';

const props = defineProps<{
    editingBoard: Board | null;
    mode?: 'edit' | 'create' | null;
}>();

const emits = defineEmits<{
    (e: 'board:create', board: Partial<Board>): void;
    (e: 'board:edit', updatedBoard: Board): void;
    (e: 'board:delete', boardId: number): void;
    (e: 'panel:close'): void;
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
