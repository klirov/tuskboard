<template>
    <form
        class="board-create-form"
        @submit.prevent="submitForm"
        :aria-labelledby="formTitle"
    >
        <h2 :id="formTitle">
            <span class="board-title">{{ t('board.creating-board') }}:</span>
        </h2>

        <fieldset>
            <legend class="visually-hidden">{{ t('board.board-data') }}</legend>

            <LabeledField
                required
                :error="touched ? r$.title.$errors[0] : undefined"
            >
                <template #label>{{ t('title') }}</template>
                <template #field="slotProps">
                    <UiInput
                        v-bind="slotProps"
                        type="text"
                        :placeholder="t('board.enter-title')"
                        v-model="localBoard.title"
                    />
                </template>
            </LabeledField>

            <LabeledField :error="touched ? r$?.description?.$errors[0] : undefined">
                <template #label> {{ t('description') }}</template>
                <template #field>
                    <UiInput
                        :placeholder="t('enter-description')"
                        v-model="localBoard.description"
                    />
                </template>
            </LabeledField>

            <LabeledField>
                <template #label>
                    {{ t('color') }}
                </template>
                <template #field>
                    <UiColorPicker v-model="localBoard.color" />
                </template>
            </LabeledField>

            <LabeledField>
                <template #label>
                    {{ t('board.archived') }}
                </template>
                <template #field>
                    <UiToggle v-model="localBoard.is_archived" />
                </template>
            </LabeledField>
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
import { computed, ref, watch } from 'vue';
import { useRegle } from '@regle/core';
import { useI18n } from 'vue-i18n';
import { maxLength, minLength, required, withMessage } from '@regle/rules';
import type { Board } from '../../../../../shared/types';
import type { ManageMode } from '../../../shared/composables/useManageEntityPanel';

import LabeledField from '../../../components/molecules/LabeledField.vue';
import UiInput from '../../../components/atoms/UiInput.vue';
import UiButton from '../../../components/atoms/UiButton.vue';
import UiToggle from '../../../components/atoms/UiToggle.vue';
import UiColorPicker from '../../../components/atoms/UiColorPicker.vue';

const { t } = useI18n();

type Props = { mode: ManageMode; editingBoard: Board | null };

const props = defineProps<Props>();

const emits = defineEmits<{
    (e: 'board:create', board: Partial<Board>): void;
    (e: 'board:edit', board: Partial<Board>): void;
    (e: 'board:delete', boardId: number): void;
}>();

const localBoard = ref<Partial<Board>>({
    title: '',
    description: '',
    color: '',
    is_archived: false,
});

watch(
    () => props.editingBoard,
    (newBoard) => {
        if (newBoard) {
            localBoard.value = { ...newBoard };
        }
    },
    { immediate: true },
);

const { r$ } = useRegle(localBoard, {
    title: {
        required: withMessage(required, () => t('form.field-required')),
        minLength: withMessage(minLength(2), () => `${t('form.minimum-length')}: 2`),
        maxLength: withMessage(maxLength(255), () => `${t('form.maximum-length')}: 255`),
    },
    description: {
        maxLength: withMessage(maxLength(1500), () => `${t('form.maximum-length')}: 1500`),
    },
});

const touched = ref(false);

function submitForm() {
    touched.value = true;
    r$.$touch();

    if (r$.$invalid) return;

    props.mode === 'create'
        ? emits('board:create', localBoard.value)
        : emits('board:edit', localBoard.value);
}

const formTitle = computed(() => {
    return props.mode === 'create' ? 'board-create-title' : 'board-edit-title';
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
