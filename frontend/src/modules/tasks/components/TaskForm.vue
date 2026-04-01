<template>
    <form
        v-if="localTask"
        class="task-edit-form"
        @submit.prevent="submitForm"
        :aria-labelledby="formTitle"
    >
        <h2 :id="formTitle">
            <span class="task-title">{{ t('task.editing-task') }}:</span>
            {{ editingTask?.title }}
        </h2>

        <fieldset>
            <legend class="visually-hidden">{{ t('task.task-data') }}</legend>

            <LabeledField
                required
                :error="touched ? r$.title.$errors[0] : undefined"
            >
                <template #label>{{ t('title') }}</template>
                <template #field="slotProps">
                    <UiInput
                        v-bind="slotProps"
                        type="text"
                        :placeholder="t('task.enter-title')"
                        v-model="localTask.title"
                    />
                </template>
            </LabeledField>

            <LabeledField :error="touched ? r$?.description?.$errors[0] : undefined">
                <template #label>{{ t('description') }}</template>
                <template #field>
                    <UiTextarea
                        :placeholder="t('task.enter-description')"
                        v-model="localTask.description"
                    />
                </template>
            </LabeledField>

            <LabeledField
                required
                :error="touched ? r$?.status?.$errors[0] : undefined"
            >
                <template #label>{{ t('status') }}</template>
                <template #field>
                    <UiSelect
                        v-model="localTask.status"
                        :options="optionsWithLocales"
                    />
                </template>
            </LabeledField>

            <TagInput
                :label="t('task.tags')"
                v-model="localTask.tags"
            />
        </fieldset>

        <div class="buttons">
            <UiButton
                class="submit-button"
                type="submit"
            >
                {{ t('save-changes') }}
            </UiButton>

            <UiButton
                v-if="mode === 'edit'"
                @click="showConfirm = !showConfirm"
                background-color="var(--color-danger)"
                width="max-content"
                padding="0.875rem"
            >
                <Trashcan class="icon" />
            </UiButton>

            <Transition name="fade-scale">
                <ConfirmPopover
                    v-if="showConfirm && localTask.id"
                    :confirmation-text="t('task.delete-confirm-text')"
                    @popover:cancel="showConfirm = false"
                    @popover:confirm="emits('task:delete', localTask.id)"
                />
            </Transition>
        </div>
    </form>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { useRegle } from '@regle/core';
import { useI18n } from 'vue-i18n';
import { maxLength, minLength, required, withMessage } from '@regle/rules';
import type { Task } from '../../../../../shared/types';
import type { ManageMode } from '../../../shared/composables/useManageEntityPanel';

import LabeledField from '../../../components/molecules/LabeledField.vue';
import TagInput from '../../../components/molecules/TagInput.vue';
import ConfirmPopover from '../../../components/molecules/ConfirmPopover.vue';
import UiInput from '../../../components/atoms/UiInput.vue';
import UiButton from '../../../components/atoms/UiButton.vue';
import Trashcan from '../../../shared/ui/icons/Trashcan.vue';
import UiSelect from '../../../components/atoms/UiSelect.vue';
import UiTextarea from '../../../components/atoms/UiTextarea.vue';

const props = defineProps<{ mode: ManageMode; editingTask: Task | null }>();

const emits = defineEmits<{
    (e: 'task:create', task: Partial<Task>): void;
    (e: 'task:edit', updatedTask: Partial<Task>): void;
    (e: 'task:delete', taskId: number): void;
}>();

const { t } = useI18n();

const localTask = ref<Partial<Task>>({
    title: '',
    description: '',
    tags: [],
    status: 'to-do',
});

watch(
    () => props.editingTask,
    (newTask) => {
        if (newTask) {
            localTask.value = newTask;
        }
    },
    { immediate: true },
);

const optionsWithLocales = [
    { value: 'backlog', label: t('task.statuses.backlog') },
    { value: 'to-do', label: t('task.statuses.to-do') },
    { value: 'in-progress', label: t('task.statuses.in-progress') },
    { value: 'awaiting', label: t('task.statuses.awaiting') },
];

const { r$ } = useRegle(localTask, {
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

const touched = ref(false);
const showConfirm = ref(false);

function submitForm() {
    touched.value = true;
    r$.$touch();

    if (r$.$invalid) return;

    props.mode === 'create'
        ? emits('task:create', localTask.value)
        : emits('task:edit', localTask.value);
}

const formTitle = computed(() => 'task-edit-title');
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
