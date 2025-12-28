<template>
    <div
        :style="{ 'background-color': tagColor(tag) }"
    >
        <p>{{ tag.toUpperCase() }}</p>
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
    display: flex;
    justify-content: center;
    align-items: center;

    padding: 0.25rem;
    border-radius: 0.25rem;

    color: var(--color-card-text);
}

p {
    font-size: 0.75rem;
    font-weight: 600;
}
</style>
