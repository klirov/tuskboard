<template>
    <div :style="{ 'background-color': tagColor(tag) }">
        <p>{{ tag.toUpperCase() }}</p>
        <slot />
    </div>
</template>

<script setup lang="ts">
import { tagColor } from '../../utils/GenerateCardColors';

defineProps<{
    tag: string;
}>();
</script>

<style scoped>
div {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;

    padding: 0.25rem;
    border-radius: 0.25rem;

    white-space: nowrap;

    color: var(--color-card-text);
}

p {
    font-size: 0.75rem;
    font-weight: 600;
}
</style>
