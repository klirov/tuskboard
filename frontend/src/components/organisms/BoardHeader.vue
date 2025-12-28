<template>
    <header>
        <div class="left-section"></div>
        <div class="right-section">
            <ThemeToggleButton />
        </div>
    </header>
</template>

<script setup lang="ts">
import ThemeToggleButton from '../molecules/ThemeToggleButton.vue';
</script>

<style scoped>
header {
    width: 100%;
    padding: 1rem;

    display: flex;
    justify-content: space-between;

    box-shadow: 0 0 0 0.5px var(--color-border);
    background-color: var(--color-secondary);
}
</style>
