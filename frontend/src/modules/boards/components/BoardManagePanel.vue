<template>
    <aside class="panel">
        <header class="panel-header">
            <h2>{{ t('panel.manage-panel') }}</h2>
            <UiButton @click="emits('panel:close')">{{ t('close') }}</UiButton>
        </header>
        <BoardForm
            :mode="mode"
            :editing-board="editingBoard"
            @board:create="emits('board:create', $event)"
            @board:edit="emits('board:edit', $event)"
            @board:delete="emits('board:delete', $event)"
        />
    </aside>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

import type { Board } from '../../../../../shared/types';
import BoardForm from './BoardForm.vue';
import UiButton from '../../../components/atoms/UiButton.vue';
import type { ManageMode } from '../../../shared/composables/useManageEntityPanel';

type Props = { mode: ManageMode; editingBoard: Board | null };

const props = defineProps<Props>();

const emits = defineEmits<{
    (e: 'board:create', board: Partial<Board>): void;
    (e: 'board:edit', board: Partial<Board>): void;
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
