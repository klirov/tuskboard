<template>
    <input
        class="transition-theme"
        :placeholder="props.placeholder"
        :type="props.type"
        v-model="model"
    />
</template>

<script setup lang="ts">
type InputTypes = 'text' | 'password' | 'email' | 'number';

export type InputProps = {
    placeholder?: string;
    type?: InputTypes;
};

const model = defineModel<string>();

const props = withDefaults(defineProps<InputProps>(), {
    type: 'text',
});
</script>

<style scoped>
input {
    width: min(100%, 30em);
    height: max-content;
    padding: 0.75em 1em;
    border-radius: 1em;

    border: 1px solid transparent;
    color: var(--color-text);
    background-color: var(--color-secondary);
}
input:focus-visible {
    border-color: var(--color-text);
    outline: none;
}
input::placeholder {
    color: var(--color-placeholder);
}
</style>
