<template>
    <form
        v-if="localTask"
        class="task-edit-form"
        @submit.prevent="emits('submit', localTask)"
        aria-labelledby="task-edit-title"
    >
        <h2 id="task-edit-title">
            <span class="task-title">{{ t('task.edit-task') }}:</span> {{ editingTask?.title }}
        </h2>
        <fieldset>
            <legend class="visually-hidden">{{ t('task.task-data') }}</legend>

            <LabeledInput
                :label="t('title')"
                type="text"
                :placeholder="t('task.enter-title')"
                :error="r$?.title?.$errors[0]"
                v-model="localTask.title"
                aria-required="true"
            />
            <LabeledTextarea
                :label="t('description')"
                :placeholder="t('task.enter-description')"
                v-model="localTask.description"
                :error="r$?.description?.$errors[0]"
            />
            <LabeledSelect
                :label="t('status')"
                :title="`${t('task.choose-status')}:`"
                v-model="localTask.status"
                :error="r$?.status?.$errors[0]"
                :options="optionsWithLocales"
                aria-required="true"
            />
        </fieldset>
        <div class="buttons">
            <UiButton
                class="submit-button"
                type="submit"
                >{{ t('save-changes') }}</UiButton
            >

            <UiButton
                @click="showConfirm = !showConfirm"
                background-color="var(--color-danger)"
                width="max-content"
                padding="0.875rem"
            >
                <TrashcanIcon class="icon" />
            </UiButton>
            <Transition name="fade-scale">
                <ConfirmPopover
                    v-if="showConfirm"
                    :confirmation-text="t('task.delete-confirm-text')"
                    @popover:cancel="showConfirm = false"
                    @popover:confirm="emits('deleteTask', localTask.id)"
                />
            </Transition>
        </div>
    </form>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRegle } from '@regle/core';
import { useI18n } from 'vue-i18n';
import { maxLength, minLength, required, withMessage } from '@regle/rules';
import type { Task } from '../../../../../shared/types';
import LabeledInput from '../../molecules/LabeledInput.vue';
import LabeledTextarea from '../../molecules/LabeledTextarea.vue';
import LabeledSelect from '../../molecules/LabeledSelect.vue';
import ConfirmPopover from '../../molecules/ConfirmPopover.vue';
import TrashcanIcon from '../../atoms/icons/TrashcanIcon.vue';
import UiButton from '../../atoms/UiButton.vue';

const props = defineProps<{ editingTask: Task | null }>();

const emits = defineEmits<{
    (e: 'submit', updatedTask: Task): void;
    (e: 'deleteTask', taskId: number): void;
}>();

const { t } = useI18n();

const localTask = ref<Task | null>(null);

const showConfirm = ref(false);

const optionsWithLocales = [
  { value: 'backlog', label: t('task.statuses.backlog') },
  { value: 'to-do', label: t('task.statuses.to-do') },
  { value: 'in-progress', label: t('task.statuses.in-progress') },
  { value: 'awaiting', label: t('task.statuses.awaiting') },
];

watch(
    () => props.editingTask,
    () =>
        props.editingTask ? (localTask.value = { ...props.editingTask }) : (localTask.value = null),
    { immediate: true },
);

const { r$ } = useRegle(localTask.value, {
    title: {
        required: withMessage(required, () => t('form.field-required')),
        minLength: withMessage(minLength(3), () => `${t('form.minimum-length')}: 3`),
        maxLength: withMessage(maxLength(255), () => `${t('form.maximum-length')}: 255`),
    },
    description: {
        maxLength: withMessage(maxLength(1000), `${t('form.maximum-length')}: 1000`),
    },
    status: {
        required: withMessage(required, t('form.field-required')),
    },
});
</script>

<style scoped>
.task-edit-form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    padding: 1rem;
}
.visually-hidden {
    display: none;
}
.task-title {
    color: var(--color-accent);
}
fieldset {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    border: none;
    padding: 0;
    margin: 0;
}
.buttons {
    position: relative;
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: space-between;

    gap: 0.5rem;
}
.submit-button {
    width: 100%;
}
.icon {
    width: 1rem;
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
