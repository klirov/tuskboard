<template>
    <div
        ref="pickerRoot"
        class="color-picker-wrapper"
    >
        <div
            class="color-preview"
            :style="{ backgroundColor: model || '#a1bca9' }"
            @click="isOpen = !isOpen"
        />

        <Transition name="fade-scale">
            <div
                v-if="isOpen"
                class="color-dropdown"
            >
                <div class="color-grid">
                    <button
                        type="button"
                        v-for="color in presetColors"
                        :key="color"
                        class="color-swatch"
                        :style="{ backgroundColor: color }"
                        :class="{ 'is-selected': color === model }"
                        @click="selectColor(color, $event)"
                    />
                </div>

                <div class="color-current">
                    <span>{{ t('custom') }}:</span>
                    <input
                        type="color"
                        class="native-color-input"
                        v-bind="$attrs"
                        v-model="model"
                    />
                    <span class="hex-value">{{ model || '#a1bca9' }}</span>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, useTemplateRef } from 'vue';
import { useI18n } from 'vue-i18n';

defineOptions({ inheritAttrs: false });

const model = defineModel<string>();

const { t } = useI18n();

const isOpen = ref(false);

const pickerRoot = useTemplateRef('pickerRoot');

const presetColors = [
    '#FF6B6B',
    '#4ECDC4',
    '#45B7D1',
    '#96CEB4',
    '#FFEEAD',
    '#D4A5A5',
    '#9B59B6',
    '#3498DB',
    '#E74C3C',
    '#2ECC71',
    '#F1C40F',
    '#E67E22',
    '#1ABC9C',
    '#34495E',
    '#7F8C8D',
    '#000000',
    '#FFFFFF',
    '#95A5A6',
];

function selectColor(color: string, event: MouseEvent) {
    model.value = color;
    isOpen.value = false;
    event.stopPropagation();
}

function closeOnClickOutside(event: MouseEvent) {
    if (!pickerRoot.value) return;

    if (pickerRoot.value.contains(event.target as Node)) {
        return;
    }
    isOpen.value = false;
}

onMounted(() => {
    document.addEventListener('click', closeOnClickOutside);
});

onUnmounted(() => {
    document.removeEventListener('click', closeOnClickOutside);
});
</script>

<style scoped>
.color-picker-wrapper {
    position: relative;
    width: 100%;
}

.color-preview {
    width: 100%;
    height: 3rem;
    border-radius: 1rem;
    border: 1px solid var(--color-border);
    cursor: pointer;
}

.native-color-input {
    width: 100%;
    height: 2rem;
    cursor: pointer;
}

.color-dropdown {
    position: absolute;
    top: calc(100% + 1rem);
    left: 0;
    z-index: 10;

    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    background: var(--color-secondary);
    border: 1px solid var(--color-border);
    border-radius: 1em;
    padding: 1rem;
}

.color-grid {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 0.5rem;
    margin-bottom: 1rem;
}

.color-swatch {
    width: 2rem;
    aspect-ratio: 1 / 1;
    cursor: pointer;
    border: 1px solid transparent;
    border-radius: 0.75em;
    transition: all 0.25s ease;
}

.color-swatch:hover {
    transform: scale(1.1);
}

.color-swatch.is-selected {
    border: 1px solid var(--color-border);
}

.color-current {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    padding-top: 10px;
}

.current-preview {
    width: 100%;
    height: 2rem;
    border-radius: 0.5rem;
}

.fade-scale-enter-active,
.fade-scale-leave-active {
    transition: all 0.25s ease;
}

.fade-scale-enter-from,
.fade-scale-leave-to {
    opacity: 0;
    transform: scale(0.92) translateY(-4px);
}

.fade-scale-enter-to,
.fade-scale-leave-from {
    opacity: 1;
    transform: scale(1) translateY(0);
}
</style>
