<template>
    <div>
        <LabeledInput
            label="Лейбл первого инпута"
            placeholder="Текстовый инпут с лейблом"
        />
        <LabeledInput
            label="Лейбл второго инпута"
            placeholder="Текстовый инпут с лейблом"
        />
        <LabeledInput
            label="Лейбл третьего инпута"
            placeholder="Текстовый инпут с лейблом"
        />
        <ThemeToggleButton />
        <AppLink
            href="https://youtube.com"
            target="_blank"
            size="small"
        >
            Маленькая ссылка на Youtube
        </AppLink>
        <AppLink to="/login">Стандартная ссылка на внутреннюю страницу логина</AppLink>
        <AppLink
            href="https://google.com"
            target="_blank"
            size="large"
        >
            Большая ссылка на Google
        </AppLink>
    </div>
</template>

<script setup lang="ts">
import AppLink from '../components/molecules/AppLink.vue';
import LabeledInput from '../components/molecules/LabeledInput.vue';
import ThemeToggleButton from '../components/molecules/ThemeToggleButton.vue';
</script>

<style scoped>
div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1em;
    height: 100%;
}
</style>
