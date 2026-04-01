<template>
    <Transition name="slide-from-left">
        <BoardManagePanel
            v-if="isOpen && mode"
            :editing-board="editingItem"
            :mode="mode"
            @panel:close="close"
            @board:create="tryToCreateBoard"
            @board:delete="tryToDeleteBoard"
            @board:edit="tryToEditBoard"
        />
    </Transition>
    <HeaderTemplate>
        <template #left-section></template>
        <template #center-section>
            <UiButton @click="toggle()">{{ t('board.create-new-board') }}</UiButton>
        </template>
        <template #right-section>
            <SwitchLanguageButton />
            <ThemeToggleButton />
            <ProfileButton />
        </template>
    </HeaderTemplate>
    <div class="boards">
        <h2 v-if="loading">{{ t('board.loading-boards') }}...</h2>
        <h2 v-else-if="boards.length === 0">{{ t('board.no-boards-yet') }}...</h2>
        <BoardCard
            v-else
            v-for="board in boards"
            :key="board.id"
            :board="board"
            @panel:edit="toggle(board)"
            @click="router.push(`/board/${board.id}`)"
        />
    </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import type { Board } from '../../../shared/types';
import { useAuthStore } from '../modules/auth/auth.store';
import { useBoards } from '../modules/boards/useBoards';
import { useManageEntityPanel } from '../shared/composables/useManageEntityPanel';
import { useNotifications } from '../shared/composables/useNotifications';

import UiButton from '../components/atoms/UiButton.vue';
import ProfileButton from '../components/molecules/ProfileButton.vue';
import SwitchLanguageButton from '../components/molecules/SwitchLanguageButton.vue';
import ThemeToggleButton from '../components/molecules/ThemeToggleButton.vue';
import BoardCard from '../modules/boards/components/BoardCard.vue';
import BoardManagePanel from '../modules/boards/components/BoardManagePanel.vue';
import HeaderTemplate from '../shared/layouts/HeaderTemplate.vue';

const router = useRouter();

const { t } = useI18n();

const userStore = useAuthStore();

const { user } = storeToRefs(userStore);

const { isOpen, editingItem, mode, close, toggle } = useManageEntityPanel<Board>();

const { boards, loading, getBoards, createBoard, editBoard, deleteBoard } = useBoards(
    user.value!.id,
);

const { showNotification } = useNotifications();

async function tryToCreateBoard(board: Partial<Board>) {
    try {
        await createBoard(board);

        close();

        await getBoards();
    } catch {
        showNotification('error', 'Failed to create Board.');
    }
}

async function tryToDeleteBoard(boardId: number) {
    try {
        await deleteBoard(boardId);

        close();

        await getBoards();
    } catch {
        showNotification('error', 'Failed to delete Board.');
    }
}

async function tryToEditBoard(updatedBoard: Partial<Board>) {
    try {
        await editBoard(updatedBoard);

        close();

        await getBoards();
    } catch {
        showNotification('error', 'Failed to edit Board. Please try again.');
    }
}
onMounted(getBoards);
</script>

<style scoped>
.boards {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;

    padding: 1rem;
}
.slide-from-left-enter-active,
.slide-from-left-leave-active {
    transition:
        transform 0.25s cubic-bezier(0.32, 0.72, 0, 1),
        opacity 0.25s ease,
        box-shadow 0.25s ease;
}

.slide-from-left-enter-from,
.slide-from-left-leave-to {
    transform: translateX(-100%);
    opacity: 0.4;
    box-shadow: none;
}

.slide-from-left-enter-to,
.slide-from-left-leave-from {
    transform: translateX(0);
    opacity: 1;
    box-shadow: -12px 0 25px rgba(0, 0, 0, 0.18);
}
</style>
