<template>
    <form
        class="board-create-form"
        @submit.prevent="emits('board:create', localBoard)"
        aria-labelledby="board-create-title"
    >
        <h2 id="board-create-title">
            <span class="board-title">{{ t('board.creating-board') }}:</span>
        </h2>

        <fieldset>
            <legend class="visually-hidden">{{ t('board.board-data') }}</legend>

            <LabeledInput
                :label="t('title')"
                type="text"
                :placeholder="t('board.enter-title')"
                :error="r$?.title?.$errors[0]"
                v-model="localBoard.title"
                aria-required="true"
            />

            <LabeledTextarea
                :label="t('description')"
                :placeholder="t('board.enter-description')"
                v-model="localBoard.description"
                :error="r$?.description?.$errors[0]"
            />

            <LabeledColorPicker
                label="Color"
                v-model="localBoard.color"
            />

            <LabeledToggle
                :label="t('board.archived')"
                v-model="localBoard.is_archived"
            />
        </fieldset>

        <div class="buttons">
            <UiButton
                class="submit-button"
                type="submit"
            >
                {{ t('save-changes') }}
            </UiButton>
        </div>
    </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRegle } from '@regle/core';
import { useI18n } from 'vue-i18n';
import { maxLength, minLength, required, withMessage } from '@regle/rules';
import type { Board } from '../../../../../shared/types';

import LabeledInput from '../../molecules/LabeledInput.vue';
import LabeledTextarea from '../../molecules/LabeledTextarea.vue';
import UiButton from '../../atoms/UiButton.vue';
import LabeledColorPicker from '../../molecules/LabeledColorPicker.vue';
import LabeledToggle from '../../molecules/LabeledToggle.vue';

const emits = defineEmits<{
    (e: 'board:create', board: Partial<Board>): void;
}>();

const { t } = useI18n();

const localBoard = ref<Partial<Board>>({
    title: '',
    description: '',
    color: '',
    is_archived: false,
});

const { r$ } = useRegle(localBoard.value, {
    title: {
        required: withMessage(required, () => t('form.field-required')),
        minLength: withMessage(minLength(2), () => `${t('form.minimum-length')}: 2`),
        maxLength: withMessage(maxLength(255), () => `${t('form.maximum-length')}: 255`),
    },
    description: {
        maxLength: withMessage(maxLength(1500), () => `${t('form.maximum-length')}: 1500`),
    },
});
</script>

<style scoped>
.board-create-form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    padding: 1rem;
}

.visually-hidden {
    display: none;
}

.board-title {
    color: var(--color-accent);
}

fieldset {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    border: none;
    padding: 0;
    margin: 0;
}

.buttons {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    margin-top: 1rem;
}

.submit-button {
    width: 100%;
}

.icon {
    width: 1.1rem;
    color: var(--color-text);
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
