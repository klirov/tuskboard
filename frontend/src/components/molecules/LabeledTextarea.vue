<template>
    <div class="labeled-textarea">
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
        <UiTextarea
            :id="id"
            :aria-describedby="error ? `${id}-error` : undefined"
            placeholder="placeholder"
            v-model="model"
        />
    </div>
</template>

<script setup lang="ts">
import UiTextarea from '../atoms/UiTextarea.vue';

const id = crypto.randomUUID();

const model = defineModel<string>();

defineProps<{
    label?: string;
    placeholder?: string;
    error?: string;
}>();
</script>

<style scoped>
.labeled-textarea {
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
    color: red;
    font-size: 0.875rem;
}
</style>
