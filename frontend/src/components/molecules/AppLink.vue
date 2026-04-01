<template>
    <router-link
        v-if="to"
        :to="to"
        custom
        v-slot="{ href: routerHref, navigate }"
    >
        <el-link
            v-bind="$attrs"
            :href="routerHref"
            underline="never"
            :class="sizeClass"
            @click="navigate"
        >
            <slot />
        </el-link>
    </router-link>

    <el-link
        v-else
        v-bind="$attrs"
        :href="href"
        :target="target"
        :rel="computedRel"
        underline="never"
        :class="sizeClass"
    >
        <slot />
    </el-link>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { RouteLocationRaw } from 'vue-router';

defineOptions({
    inheritAttrs: false,
});

interface Props {
    to?: RouteLocationRaw;
    href?: string;
    size?: 'small' | 'medium' | 'large' | 'inherit';
    target?: '_self' | '_blank';
    rel?: string;
}

const props = withDefaults(defineProps<Props>(), {
    target: '_self',
    size: 'inherit',
});

const sizeClass = computed(() => `el-link--${props.size}`);

const computedRel = computed(() => {
    if (props.rel) return props.rel;
    return props.target === '_blank' ? 'noopener noreferrer' : undefined;
});
</script>

<style scoped>
.el-link {
    --el-link-text-color: var(--color-text, #606266);
    --el-link-font-size: inherit;
    gap: 0.5rem;
}

.el-link--small {
    --el-link-font-size: 0.875rem;
}
.el-link--medium {
    --el-link-font-size: 1rem;
}
.el-link--large {
    --el-link-font-size: 1.125rem;
}

.el-link:hover {
    --el-link-hover-text-color: var(--color-accent, #409eff);
}
</style>
