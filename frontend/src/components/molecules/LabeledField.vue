<template>
    <div
        class="labeled-field"
        :class="{ disabled: disabled }"
    >
        <header class="field-header">
            <label :for="id">
                <slot name="label">
                    {{ label }}
                    <span v-if="required">*</span>
                </slot>
            </label>
            <p
                v-if="error"
                :id="`${id}-error`"
                class="field-error"
            >
                {{ error }}
            </p>
        </header>
        <slot
            name="field"
            :id="id"
            :aria-required="required"
            :aria-invalid="!!error"
            :aria-describedby="error ? `${id}-error` : undefined"
            :disabled="disabled"
        />
    </div>
</template>

<script setup lang="ts">
import { useId } from 'vue';

const id = useId();

defineProps<{
    label?: string;
    required?: boolean;
    error?: string;
    disabled?: boolean;
}>();
</script>

<style scoped>
.labeled-field {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.field-header {
    width: 100%;
    display: flex;
    justify-content: space-between;
}

.field-error {
    font-size: 0.875rem;
    color: var(--color-danger);
}

.disabled {
    opacity: 0.6;
}
</style>
