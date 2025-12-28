<template>
    <select>
        <option
            v-for="(option, index) in options"
            :key="index"
            :value="option"
        >
            {{ option }}
        </option>
    </select>
</template>

<script setup lang="ts">
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
    color: var(--color-text);
    background-color: var(--color-bg);
}
option {
    color: var(--color-text);
    background-color: var(--color-bg);
}
</style>
