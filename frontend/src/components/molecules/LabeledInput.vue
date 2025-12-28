<template>
    <div class="labeled-input">
        <header>
            <label :for="id">
                <slot>
                    {{ label }}
                </slot>
            </label>
            <p
                v-if="error"
                :id="`${id}-error`"
                class="input-error"
            >
                {{ error }}
            </p>
        </header>
        <UiInput
            :id="id"
            :aria-describedby="error ? `${id}-error` : undefined"
            :placeholder
            :type
            v-model="model"
        />
    </div>
</template>

<script setup lang="ts">
import UiInput, { type InputProps } from '../atoms/UiInput.vue';

const model = defineModel<string>();

type LabeledInputProps = InputProps & {
    label?: string;
    error?: string;
};

const id: string = `input-${crypto.randomUUID()}`;

defineProps<LabeledInputProps>();
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
header {
    width: 100%;
    display: flex;
    justify-content: space-between;
}
.input-error {
    font-size: 0.875rem;
    color: red;
}
</style>
