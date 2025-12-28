<template>
    <textarea
        v-model="model"
        placeholder="placeholder"
    ></textarea>
</template>

<script setup lang="ts">
const model = defineModel<string>();

defineProps<{ placeholder?: string }>();
</script>

<style scoped>
textarea {
    width: 100%;
    min-height: 6rem;
    padding: 1rem;
    border-radius: 1em;
    font-size: 1rem;
    color: var(--color-text);
    background-color: var(--color-bg);
    resize: vertical;
}
</style>
