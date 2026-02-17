<template>
    <div class="labeled-color-picker">
        <label :for="id">
            <slot>
                {{ label }}
            </slot>
        </label>
        <UiColorPicker
            :id="id"
            v-model="model"
        />
    </div>
</template>

<script setup lang="ts">
import { useId } from 'vue';
import UiColorPicker from '../atoms/UiColorPicker.vue';

const model = defineModel<string>();

const props = defineProps<{
    label?: string;
}>();

const id = useId();
</script>

<style scoped>
.labeled-color-picker {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
}
</style>
