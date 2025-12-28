<template>
    <div class="labeled-select">
        <header>
            <label :for="id"
                ><slot>{{ label }}</slot></label
            >
            <p
                v-if="error"
                :id="`${id}-error`"
                class="error-message"
            >
                {{ error }}
            </p>
        </header>
        <UiSelect
            :id="id"
            :options="options"
            :title="title"
            :aria-describedby="error ? `${id}-error` : undefined"
            v-model="model"
        />
    </div>
</template>

<script setup lang="ts">
import UiSelect from '../atoms/UiSelect.vue';
import type { SelectProps } from '../atoms/UiSelect.vue';

const id = crypto.randomUUID();

const model = defineModel<string>();

type LabeledSelectProps = SelectProps & {
    label?: string;
    error?: string;
};

defineProps<LabeledSelectProps>();
</script>

<style scoped>
.labeled-select {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
}

header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.error-message {
    color: var(--color-danger);
    font-size: 0.875rem;
}
</style>
