<template>
    <input
        type="checkbox"
        v-bind="$attrs"
        v-model="model"
    />
</template>

<script setup lang="ts">
const model = defineModel<boolean>();
defineOptions({ inheritAttrs: false });
</script>

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
