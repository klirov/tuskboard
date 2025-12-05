<template>
    <div class="labeled-input">
        <label
            :for="id"
            class="transition-color"
        >
            <slot>
                {{ label }}
            </slot>
        </label>
        <UiInput
            :id="id"
            :placeholder="placeholder"
            :type="type"
            v-model="model"
        />
    </div>
</template>

<script setup lang="ts">
import UiInput, { type InputProps } from '../atoms/UiInput.vue';

const model = defineModel<string>()

type LabeledInputProps = InputProps & {
    label?: string;
};

const id: string = `input-${crypto.randomUUID()}`;

const { label, placeholder, type } = defineProps<LabeledInputProps>();
</script>

<style scoped>
label {
    color: var(--color-text);
    font-size: 0.875rem;
}
.labeled-input {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
}
</style>
