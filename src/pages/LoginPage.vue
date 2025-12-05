<template>
    <section>
        <div>Страница логина</div>
        <AppLink to="/">Вернуться обратно</AppLink>
    </section>
</template>

<script setup lang="ts">
import AppLink from '../components/molecules/AppLink.vue';
</script>

<style scoped>
section {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
}
</style>
