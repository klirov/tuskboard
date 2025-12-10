<template>
    <button
        :class="['transition-theme', `button--${props.size}`]"
        :style="{ width: props.width }"
        type="button"
        @click="onClick"
    >
        <slot />
    </button>
</template>

<script setup lang="ts">
const emit = defineEmits<{
    (e: 'click', event: MouseEvent): void;
}>();

function onClick(event: MouseEvent) {
    emit('click', event);
}

const props = withDefaults(
    defineProps<{
        size?: 'xs' | 's' | 'm' | 'l' | 'xl';
        width?: string;
    }>(),
    {
        size: 'm',
        width: undefined,
    },
);
</script>

<style scoped>
button {
    cursor: pointer;
    padding: 0.75rem 1rem;
    border: none;
    background-color: var(--color-accent);
    color: var(--color-text);
    border-radius: 1em;
}
.button--xs {
    font-size: 0.5rem;
}
.button--s {
    font-size: 0.75rem;
}
.button--m {
    font-size: 1rem;
}
.button--l {
    font-size: 1.25rem;
}
.button--xl {
    font-size: 1.5rem;
}
</style>
