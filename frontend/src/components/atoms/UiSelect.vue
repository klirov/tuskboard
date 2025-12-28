<template>
    <select v-model="model">
        <option
            v-for="(option, index) in options"
            :key="index"
        >
            {{ option }}
        </option>
    </select>
</template>

<script setup lang="ts">
const model = defineModel<string>();

defineProps<{
    options: string[];
}>();
</script>

<style scoped>
select {
    width: 100%;
    padding: 0.5rem;

    font-size: 1rem;
    border-radius: 0.25em;
    border: 1px solid var(--color-border);

    color: var(--color-text);
    background-color: var(--color-secondary);
}
select:focus-visible {
    outline: none;
}
option {
    color: var(--color-text);
    background-color: var(--color-bg);
}
</style>
