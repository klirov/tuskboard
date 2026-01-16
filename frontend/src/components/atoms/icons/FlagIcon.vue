<template>
    <svg
        v-if="src"
        :class="className"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 640 480"
        :style="{ width: size || '1.5rem', height: size ? `calc(${size} * 0.75)` : '1rem' }"
    >
        <image
            :href="src"
            width="640"
            height="480"
        />
    </svg>
</template>

<script setup lang="ts">
const props = defineProps<{
    src?: string;
    className?: string;
    size?: string;
}>();
</script>

<style scoped>
svg {
    width: 1.5rem;
    height: 1rem;
    object-fit: cover;
}
</style>
