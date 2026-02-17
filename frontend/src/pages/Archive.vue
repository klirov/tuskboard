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
</template>

<script setup lang="ts">
import ProfileButton from '../components/molecules/ProfileButton.vue';
import SwitchLanguageButton from '../components/molecules/SwitchLanguageButton.vue';
import ThemeToggleButton from '../components/molecules/ThemeToggleButton.vue';
import HeaderTemplate from '../components/templates/HeaderTemplate.vue';

</script>

<style scoped></style>
