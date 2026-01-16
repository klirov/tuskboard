<template>
    <HeaderTemplate>
        <template #left-section></template>
        <template #center-section>
            <UiButton @click="emit('task:create')">{{ t('task.create-new-task') }}</UiButton>
        </template>
        <template #right-section>
            <SwitchLanguageButton /> <ThemeToggleButton /> <ProfileButton />
        </template>
    </HeaderTemplate>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import UiButton from '../../atoms/UiButton.vue';
import HeaderTemplate from '../../molecules/HeaderTemplate.vue';
import ProfileButton from '../../molecules/ProfileButton.vue';
import SwitchLanguageButton from '../../molecules/SwitchLanguageButton.vue';
import ThemeToggleButton from '../../molecules/ThemeToggleButton.vue';

const { t } = useI18n();

const emit = defineEmits<{
    (e: 'task:create'): void;
}>();
</script>
