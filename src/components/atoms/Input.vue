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
    padding: 1em;
    border: none;
    background-color: var(--color-secondary);
    border-radius: 10px;
}
input:focus-visible {
    outline: none;
}
</style>
