<template>
    <div class="labeled-toggle">
        <label :for="id">
            <slot>{{ label }}</slot>
        </label>
        <UiToggle
            :id="id"
            :disabled="disabled"
            v-model="model"
        />
    </div>
</template>

<script setup lang="ts">
import { useId } from 'vue';
import UiToggle from '../atoms/UiToggle.vue';

const id = useId();

const model = defineModel<boolean>();

const props = defineProps<{
    label?: string;
    disabled?: boolean;
}>();
</script>

<style scoped>
.labeled-toggle {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}
</style>
