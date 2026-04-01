<template>
    <div>
        <LoginForm />
    </div>
</template>

<script setup lang="ts">
import LoginForm from '../modules/auth/components/LoginForm.vue';
</script>

<style scoped>
div {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
</style>
