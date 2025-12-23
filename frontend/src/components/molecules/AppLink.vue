<template>
    <RouterLink
        v-if="to"
        :to
        custom
        v-slot="{ href, navigate }"
    >
        <UiLink
            :href
            :size
            :rel
            :target
            @click="navigate"
        >
            <slot />
        </UiLink>
    </RouterLink>

    <UiLink
        v-else
        :href="href!"
        :size
        :target
        :rel
    >
        <slot />
    </UiLink>
</template>

<script setup lang="ts">
import { RouterLink, type RouteLocationRaw } from 'vue-router';
import UiLink from '../atoms/UiLink.vue';

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
