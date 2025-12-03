<template>
    <button
        type="button"
        @click="onClick"
    >
        <slot />
    </button>
</template>

<script setup lang="ts">
const emit = defineEmits<{
    (e: 'click', event: MouseEvent): void;
}>();

function onClick(event: MouseEvent) {
    emit('click', event);
}
</script>

<style scoped>
button {
    cursor: pointer;
    width: max-content;
    height: max-content;
    padding: 0.75em 1em;
    border: none;
    background-color: var(--color-accent);
    color: var(--color-text);
    border-radius: 1em;
}
</style>
