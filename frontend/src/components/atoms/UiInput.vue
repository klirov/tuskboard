<template>
    <input
        :type="type"
        v-bind="$attrs"
        v-model="model"
        spellcheck="false"
    />
</template>

<script setup lang="ts">
export type InputProps = {
    type?: 'text' | 'password' | 'email' | 'number';
};

defineOptions({ inheritAttrs: false });

const model = defineModel<string>();

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
    font-size: 1rem;

    border: 1px solid var(--color-border);
    color: var(--color-text);
    background-color: var(--color-secondary);
}
input:focus-visible {
    outline: none;
}
input::placeholder {
    color: var(--color-placeholder);
}
</style>
