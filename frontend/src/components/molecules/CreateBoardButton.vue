<template>
    <UiButton
        class="button"
        background-color="var(--color-secondary)"
        box-shadow="0 0 0 0.5px var(--color-border)"
    >
        <PlusIcon class="icon" />
    </UiButton>
</template>

<script setup lang="ts">
import PlusIcon from '../atoms/icons/PlusIcon.vue';
import UiButton from '../atoms/UiButton.vue';
</script>

<style scoped>
.button {
    width: 100%;
    height: 10rem;
}
.icon {
    width: 3rem;
    color: var(--color-text);
}
</style>
