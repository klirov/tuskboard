<template>
    <input
        class="transition-theme"
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
}
input:focus-visible {
    border-color: var(--color-text);
    outline: none;
}
input::placeholder {
    color: var(--color-placeholder);
}
</style>
