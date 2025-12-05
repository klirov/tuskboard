<template>
    <input type="checkbox" />
</template>

<script setup lang="ts"></script>

<style scoped>
input {
    cursor: pointer;
    accent-color: var(--color-accent);
}

/* фокус-обводка под твою тему */
input:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 2px;
}

/* не обязательно, но можно слегка увеличить чекбокс */
input {
    transform: scale(1.75);
}
</style>
