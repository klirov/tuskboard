<template>
    <header>
        <div class="section"><slot name="left-section" /></div>
        <div class="section center"><slot name="center-section" /></div>
        <div class="section"><slot name="right-section" /></div>
    </header>
</template>

<script setup lang="ts"></script>

<style scoped>
header {
    position: relative;
    width: 100%;
    padding: 1rem;

    display: flex;
    justify-content: space-between;

    box-shadow: 0 0 0 0.5px var(--color-border);
    background-color: var(--color-secondary);
}
.section {
    display: flex;
    gap: 1rem;
}

.center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>
