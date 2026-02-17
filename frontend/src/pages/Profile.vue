<template>
    <HeaderTemplate>
        <template #left-section></template>
        <template #center-section></template>
        <template #right-section>
            <SwitchLanguageButton />
            <ThemeToggleButton />
            <ProfileButton />
        </template>
    </HeaderTemplate>
    <div class="navigation-buttons">
        <AppLink to="/boards">{{ t('boards') }}</AppLink>
        <AppLink to="/archive">{{ t('archive') }}</AppLink>
    </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import AppLink from '../components/molecules/AppLink.vue';
import HeaderTemplate from '../components/templates/HeaderTemplate.vue';
import SwitchLanguageButton from '../components/molecules/SwitchLanguageButton.vue';
import ThemeToggleButton from '../components/molecules/ThemeToggleButton.vue';
import ProfileButton from '../components/molecules/ProfileButton.vue';

const { t } = useI18n();
</script>

<style scoped>
.navigation-buttons {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    padding: 1rem;
    width: 100%;
}
</style>
