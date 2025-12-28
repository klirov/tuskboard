<template>
    <RouterView />
    <NotificationsContainer />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import NotificationsContainer from '../components/molecules/NotificationsContainer.vue';
</script>

<style scoped></style>
