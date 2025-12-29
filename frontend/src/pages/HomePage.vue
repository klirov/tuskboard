<template>
    <div>
        <ThemeToggleButton />
        <AppLink to="/register">Авторизация</AppLink>
    </div>
</template>

<script setup lang="ts">
import AppLink from '../components/molecules/AppLink.vue';
import ThemeToggleButton from '../components/molecules/ThemeToggleButton.vue';
</script>

<style scoped>
div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    height: 100%;
}
</style>
