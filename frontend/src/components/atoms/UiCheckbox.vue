<template>
    <input type="checkbox" />
</template>

<script setup lang="ts"></script>

<style scoped>
input {
    cursor: pointer;
    accent-color: var(--color-accent);
}

input:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 2px;
}

input {
    transform: scale(1.75);
}
</style>
