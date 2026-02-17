<template>
    <div>
        <h1>Welcome to tuskmanager!</h1>
        <h2>
            <AppLink to="/register">{{ t('authorize') }}</AppLink>
        </h2>
    </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import AppLink from '../components/molecules/AppLink.vue';

const { t } = useI18n();
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
