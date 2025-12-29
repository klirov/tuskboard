<template>
    <button
        :class="`button--${size}`"
        :style="buttonStyles"
        type="button"
        @click="onClick"
    >
        <slot />
    </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

export type ButtonProps = {
    size?: 'xs' | 's' | 'm' | 'l' | 'xl';
    width?: string;
    height?: string;
    padding?: string;
    aspectRatio?: string;
    boxShadow?: string;
    backgroundColor?: string;
};

const props = withDefaults(defineProps<ButtonProps>(), {
    size: 'm',
    padding: undefined,
    aspectRatio: undefined,
    boxShadow: undefined,
    backgroundColor: undefined,
});

const buttonStyles = computed(() => {
    return {
        width: props.width,
        height: props.height,
        padding: props.padding ?? '0.75rem 1.5rem',
        'aspect-ratio': props.aspectRatio,
        'box-shadow': props.boxShadow,
        'background-color': props.backgroundColor,
    };
});

const emit = defineEmits<{
    (e: 'click', event: MouseEvent): void;
}>();

function onClick(event: MouseEvent) {
    emit('click', event);
}
</script>

<style scoped>
button {
    cursor: pointer;
    border: none;

    background-color: var(--color-accent);
    color: var(--color-text);

    border-radius: 1em;

    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    
    gap: 0.5rem;
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
