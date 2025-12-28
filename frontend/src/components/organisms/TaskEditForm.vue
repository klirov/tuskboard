<template>
    <form
        v-if="localTask"
        class="task-edit-form"
        @submit.prevent="handleSubmit"
        aria-labelledby="task-edit-title"
    >
        <h2 id="task-edit-title">Editing task: {{ localTask.title }}</h2>
        <fieldset>
            <legend class="visually-hidden">Task data</legend>

            <LabeledInput
                ref="titleInput"
                label="Title"
                type="text"
                placeholder="Enter task title"
                :error="r$?.title?.$errors[0]"
                v-model="localTask.title"
                aria-required="true"
            />
            <LabeledTextarea
                label="Description"
                placeholder="Enter task description"
                v-model="localTask.description"
                :error="r$?.description?.$errors[0]"
            />
            <LabeledSelect
                label="Status"
                v-model="localTask.status"
                :error="r$?.status?.$errors[0]"
                :options="['backlog', 'to-do', 'in-progress', 'awaiting']"
                aria-required="true"
            />
        </fieldset>
    </form>
</template>

<script setup lang="ts">
import { useRegle } from '@regle/core';
import LabeledInput from '../molecules/LabeledInput.vue';
import { maxLength, minLength, required } from '@regle/rules';
import LabeledTextarea from '../molecules/LabeledTextarea.vue';
import LabeledSelect from '../molecules/LabeledSelect.vue';
import type { Task } from '../../../../shared/types';
import { computed, nextTick, useTemplateRef, watch } from 'vue';

const props = defineProps<{ editingTask: Task | null }>();

const titleInput = useTemplateRef<InstanceType<typeof LabeledInput>>('titleInput');

const localTask = computed<Task | null>(() => props.editingTask);

const { r$ } = useRegle(localTask.value, {
    title: { required, minLength: minLength(3), maxLength: maxLength(255) },
    description: { maxLength: maxLength(1000) },
    tags: {},
    status: { required },
});
function handleSubmit() {}

watch(
    () => props.editingTask,
    async (val) => {
        if (val) {
            await nextTick();
            const input = titleInput.value?.$el?.querySelector?.('input');
            if (input instanceof HTMLInputElement) input.focus();
        }
    },
    { immediate: true },
);
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
fieldset {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    border: none;
    padding: 0;
    margin: 0;
}
</style>
