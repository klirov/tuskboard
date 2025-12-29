<template>
    <div class="boards">
        <slot name="boards" />
        <CreateBoardButton />
    </div>
</template>

<script setup lang="ts">
import CreateBoardButton from '../molecules/CreateBoardButton.vue'
</script>

<style scoped>
.boards {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
    padding: 1rem;
    width: 100%;
}
</style>