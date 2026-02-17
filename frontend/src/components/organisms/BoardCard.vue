<template>
    <div
        @mouseenter="isEditVisible = true"
        @mouseleave="isEditVisible = false"
        class="board-card"
        :style="{
            '--board-color': board.color ?? '#a1bca9',
        }"
    >
        <h2>{{ board.title }}</h2>

        <h3>{{ board.description }}</h3>
        <Transition name="v">
            <UiButton
                v-if="isEditVisible"
                size="s"
                padding="0.25rem"
                position="absolute"
                top="0.75rem"
                right="0.75rem"
                boxShadow="0 3px 4px -2px rgba(0, 0, 0, 0.18)"
                @click.stop="emits('panel:edit', board)"
            >
                <EditIcon class="edit-icon" />
            </UiButton>
        </Transition>
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

    box-shadow: 0 0 0 1px var(--board-color);
    background-color: var(--color-secondary);

    overflow: hidden;
    overflow-wrap: break-word;
    word-break: break-word;
}
.edit-icon {
    width: 1.5rem;
    aspect-ratio: 1 / 1;
}
.v-enter-active,
.v-leave-active,
.v-appear-active {
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.v-enter-from,
.v-leave-to,
.v-appear-from {
    opacity: 0;
    transform: translateY(10px);
}
</style>
