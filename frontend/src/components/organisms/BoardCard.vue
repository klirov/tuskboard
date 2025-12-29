<template>
    <div
        class="board-card"
        :style="{
            '--board-color': board.color ?? 'transparent',
        }"
    >
        <h2>{{ board.title }}</h2>
    </div>
</template>

<script setup lang="ts">
import type { Board } from '../../../../shared/types';

defineProps<{ board: Board }>();
</script>

<style scoped>
.board-card {
    cursor: pointer;

    width: 100%;
    height: 10rem;
    padding: 1rem;

    border-radius: 1rem;

    box-shadow: 0 0 0 0.5px var(--board-color);
    background-color: var(--color-secondary);
}
</style>
