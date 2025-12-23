<template>
    <UiButton
        @click="toggleTheme"
        class="theme-toggle"
    >
        <Transition
            :name="transitionName"
            mode="out-in"
        >
            <component
                :is="ToggleThemeIcon"
                :key="currentTheme"
                class="icon"
            />
        </Transition>
    </UiButton>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import UiButton from '../atoms/UiButton.vue';
import { useColorTheme } from '../../composables/useColorTheme';

import LightThemeIcon from '../atoms/icons/LightThemeIcon.vue';
import DarkThemeIcon from '../atoms/icons/DarkThemeIcon.vue';

const { toggleTheme, initTheme, currentTheme } = useColorTheme();

const ToggleThemeIcon = computed(() =>
    currentTheme.value === 'light' ? LightThemeIcon : DarkThemeIcon,
);

const transitionName = computed(() => (currentTheme.value === 'light' ? 'to-light' : 'to-dark'));

onMounted(() => initTheme());
</script>

<style scoped>
.theme-toggle {
    color: var(--color-secondary);
}
.icon {
    display: block;
    inline-size: 1.25rem;
    aspect-ratio: 1 / 1;
}

:deep(.to-light-enter-active),
:deep(.to-light-leave-active) {
    transition:
        opacity 0.25s ease,
        transform 0.25s ease;
}

:deep(.to-light-enter-from) {
    opacity: 0;
    transform: scale(0.8) rotate(-90deg); /* вход с -45deg */
}

:deep(.to-light-enter-to),
:deep(.to-light-leave-from) {
    opacity: 1;
    transform: scale(1) rotate(0deg);
}

:deep(.to-light-leave-to) {
    opacity: 0;
    transform: scale(0.8) rotate(90deg); /* уход с +45deg */
}

/* переход к тёмной теме (новая иконка = dark) */

:deep(.to-dark-enter-active),
:deep(.to-dark-leave-active) {
    transition:
        opacity 0.25s ease,
        transform 0.25s ease;
}

:deep(.to-dark-enter-from) {
    opacity: 0;
    transform: scale(0.8) rotate(-90deg); /* вход с +45deg */
}

:deep(.to-dark-enter-to),
:deep(.to-dark-leave-from) {
    opacity: 1;
    transform: scale(1) rotate(0deg);
}

:deep(.to-dark-leave-to) {
    opacity: 0;
    transform: scale(0.8) rotate(90deg); /* уход с -45deg */
}
</style>
