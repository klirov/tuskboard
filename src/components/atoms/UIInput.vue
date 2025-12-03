<template>
    <input
        :placeholder="props.placeholder"
        :type="props.type"
    />
</template>

<script setup lang="ts">
type InputTypes = 'text' | 'password' | 'email' | 'number';

type InputProps = {
    placeholder?: string;
    type: InputTypes;
};

const props = withDefaults(defineProps<InputProps>(), {
    type: 'text',
});
</script>

<style scoped>
input {
    width: 100%;
    height: max-content;
    padding: 0.75em 1em;
    border-radius: 1em;

    border: 1px solid transparent;
    color: var(--color-text);
    background-color: var(--color-secondary);
    transition:
        background-color 0.25s ease,
        color 0.25s ease,
        border-color 0.25s ease;
}
input:focus-visible {
    border-color: var(--color-text);
    outline: none;
}
input::placeholder {
    color: var(--color-placeholder);
    transition: color 0.25s ease;
}
</style>
