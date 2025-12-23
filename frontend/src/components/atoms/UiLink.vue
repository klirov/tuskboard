<template>
    <a
        :href
        :rel="relComputed"
        :target
        :class="['ui-link', 'transition-color', `ui-link--${size}`]"
    >
        <slot />
    </a>
</template>

<script setup lang="ts">
import { computed } from 'vue';

type LinkProps = {
    href: string;
    target?: '_self' | '_blank' | '_parent' | '_top';
    rel?: string;
    size?: 'small' | 'medium' | 'large' | 'inherit';
};

const props = withDefaults(defineProps<LinkProps>(), {
    target: '_self',
    size: 'inherit',
});

const relComputed = computed(() => {
    if (props.rel) return props.rel;
    if (props.target === '_blank') return 'noopener noreferrer';
    return undefined;
});
</script>

<style scoped>
.ui-link {
    color: var(--color-text);
    text-decoration: underline;
    font-size: inherit;
}
.ui-link:hover {
    color: var(--color-accent);
}
.ui-link--inherit {
    font-size: inherit;
}
.ui-link--small {
    font-size: 0.875rem;
}
.ui-link--medium {
    font-size: 1rem;
}
.ui-link--large {
    font-size: 1.125rem;
}
</style>
