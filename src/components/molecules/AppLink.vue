<template>
    <RouterLink
        v-if="props.to"
        :to="props.to"
        custom
        v-slot="{ href, navigate }"
    >
        <UILink
            :href="href"
            :size="props.size"
            :rel="props.rel"
            :target="props.target"
            @click="navigate"
        >
            <slot />
        </UILink>
    </RouterLink>

    <UiLink
        v-else
        :href="props.href!"
        :size="props.size"
        :target="props.target"
        :rel="props.rel"
    >
        <slot />
    </UiLink>
</template>

<script setup lang="ts">
import { RouterLink, type RouteLocationRaw } from 'vue-router';
import UiLink from '../atoms/UILink.vue';

type AppLinkProps = {
    to?: RouteLocationRaw;
    href?: string;
    target?: '_self' | '_blank' | '_parent' | '_top';
    rel?: string;
    size?: 'small' | 'medium' | 'large' | 'inherit';
};

const props = withDefaults(defineProps<AppLinkProps>(), {
    target: '_self',
    size: 'inherit',
});
</script>

<style scoped></style>
