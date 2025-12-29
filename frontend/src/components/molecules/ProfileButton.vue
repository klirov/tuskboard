<template>
    <UiButton
        background-color="var(--color-secondary)"
        box-shadow="0 0 0 0.5px var(--color-border)"
        padding="0.5rem 1rem"
        @click="router.push('/profile')"
    >
        <ProfileIcon class="icon" />
    </UiButton>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import UiButton from '../atoms/UiButton.vue';
import ProfileIcon from '../atoms/icons/ProfileIcon.vue';

const router = useRouter();
</script>

<style scoped>
.icon {
    width: 2rem;
    color: var(--color-text);
}
</style>
