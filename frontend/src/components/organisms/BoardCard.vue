<template>
    <div
        @mouseenter="isEditVisible = true"
        @mouseleave="isEditVisible = false"
        class="board-card"
        :style="{
            '--board-color': board.color ?? 'transparent',
        }"
    >
        <h2>{{ board.title }}</h2>
        <UiButton
            v-if="isEditVisible"
            size="s"
            padding="0.25rem"
            position="absolute"
            top="1rem"
            right="1rem"
            boxShadow="0 3px 4px -2px rgba(0, 0, 0, 0.18)"
            @click.stop="emits('panel:edit', board)"
        >
            <EditIcon class="edit-icon" />
        </UiButton>
        <h3>{{ board.description }}</h3>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Board } from '../../../../shared/types';
import UiButton from '../atoms/UiButton.vue';
import EditIcon from '../atoms/icons/EditIcon.vue';

const props = defineProps<{ board: Board }>();

const emits = defineEmits<{
    (e: 'panel:edit', boardData: Partial<Board>): void;
}>();

const isEditVisible = ref(false);
</script>

<style scoped>
.board-card {
    cursor: pointer;
    position: relative;

    width: 100%;
    padding: 1rem;

    display: flex;
    flex-direction: column;
    gap: 1rem;

    border-radius: 1rem;

    box-shadow: 0 0 0 0.5px var(--board-color);
    background-color: var(--color-secondary);

    overflow: hidden;
    overflow-wrap: break-word;
    word-break: break-word;
}
.edit-icon {
    width: 2rem;
    height: 2rem;
}
</style>
