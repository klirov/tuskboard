<template>
    <label
        class="toggle-switch"
        :class="{ disabled }"
    >
        <input
            type="checkbox"
            v-model="model"
            :disabled="disabled"
        />
        <span class="slider" />
    </label>
</template>

<script setup lang="ts">
const model = defineModel<boolean>({ required: true });

const props = defineProps<{
    disabled?: boolean;
}>();
</script>

<style scoped>
.toggle-switch {
    position: relative;
    display: inline-block;
    width: 44px;
    height: 24px;
    vertical-align: middle;
    cursor: pointer;
    user-select: none;
}

.toggle-switch.disabled {
    cursor: not-allowed;
}

input {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
}

.slider {
    position: absolute;
    inset: 0;
    background-color: var(--color-secondary);
    border-radius: 9999px;
    transition: background-color 0.25s ease;
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.08);
}

.slider::before {
    position: absolute;
    content: '';
    height: 18px;
    width: 18px;
    left: 3px;
    bottom: 3px;
    background-color: var(--color-accent);
    border-radius: 50%;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

input:checked + .slider {
    background-color: var(--color-accent);
}

input:checked + .slider::before {
    transform: translateX(20px);
    background-color: var(--color-bg);
}

.toggle-switch:not(.disabled):hover .slider {
    background-color: color-mix(in srgb, var(--color-bg-secondary) 85%, var(--color-accent) 15%);
}

.toggle-switch:not(.disabled):hover input:checked + .slider {
    background-color: color-mix(in srgb, var(--color-accent) 85%, white 15%);
}

input:focus-visible + .slider {
    outline: none;
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-accent) 40%, transparent 60%);
}

.toggle-switch.disabled .slider {
    opacity: 0.55;
}

.toggle-switch.disabled .slider,
.toggle-switch.disabled .slider::before {
    box-shadow: none;
}

</style>
