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
import HeaderTemplate from '../../molecules/HeaderTemplate.vue';
import ProfileButton from '../../molecules/ProfileButton.vue';
import SwitchLanguageButton from '../../molecules/SwitchLanguageButton.vue';
import ThemeToggleButton from '../../molecules/ThemeToggleButton.vue';
</script>
