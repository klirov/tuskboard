<template>
    <div class="language-switcher">
        <UiButton height="100%">
            <span class="name">{{ currentLang?.name }}</span>
            <ArrowIcon class="arrow" />
        </UiButton>
        <ul class="dropdown">
            <li
                v-for="lang in languages"
                :key="lang.code"
                :class="{ active: lang.code === locale }"
                @click="select(lang.code)"
            >
                <FlagIcon :src="lang.flag" />
                <span class="name">{{ lang.name }}</span>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useLocale } from '../../composables/useLocale';
import ArrowIcon from '../atoms/icons/ArrowIcon.vue';
import UiButton from '../atoms/UiButton.vue';
import FlagIcon from '../atoms/icons/FlagIcon.vue';
import ruFlag from '../../flags/ru.svg?url';
import gbFlag from '../../flags/gb.svg?url';

const { locale } = useI18n();
const { setLocale } = useLocale();

const languages = [
    { code: 'ru', name: 'Русский', flag: ruFlag },
    { code: 'en', name: 'English', flag: gbFlag },
];

const currentLang = computed(() => {
    return languages.find((l) => l.code === locale.value) || languages[0];
});

async function select(code: string) {
    if (code !== locale.value) {
        await setLocale(code);
    }
}
</script>

<style scoped>
.language-switcher {
    position: relative;
    display: inline-block;
}

.dropdown {
    list-style: none;
    margin: 0;
    padding: 0.25rem 0;

    position: absolute;
    top: 100%;
    right: 0;
    width: 100%;

    background-color: var(--color-secondary);
    border-radius: 0.5rem;
    border: 1px solid var(--color-border);

    opacity: 0;
    visibility: hidden;
    transform: translateY(-6px);

    transition: all 0.25s ease;
    pointer-events: none;

    z-index: 10;
}

.language-switcher:hover .dropdown {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
    pointer-events: auto;
}

.dropdown li {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    padding: 0.5rem 0.75rem;

    cursor: pointer;
    color: var(--color-text);
}

.dropdown li:hover {
    background-color: var(--color-bg);
}

.dropdown li.active {
    font-weight: 600;
}

.language-switcher:hover .arrow {
    transform: rotate(180deg);
    transition: transform 0.25s ease;
}
</style>
