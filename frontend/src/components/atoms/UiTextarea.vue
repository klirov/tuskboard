<template>
    <textarea
        v-model="model"
        :placeholder="placeholder"
    ></textarea>
</template>

<script setup lang="ts">
const model = defineModel<string>();

export type TextareaProps = {
    placeholder?: string;
}

defineProps<TextareaProps>();
</script>

<style scoped>
textarea {
    width: 100%;
    min-height: 6rem;
    padding: 1rem;

    border-radius: 1em;

    color: var(--color-text);
    background-color: var(--color-secondary);
    border: 1px solid var(--color-border);

    resize: vertical;
}
textarea:focus-visible {
    outline: none;
}
</style>
