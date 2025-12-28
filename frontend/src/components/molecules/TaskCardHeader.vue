<template>
    <header
        class="title-wrapper"
        :style="{ 'background-color': background }"
    >
        <h3>{{ title }}</h3>
        <UiButton
            v-if="showEditButton"
            size="s"
            padding="0"
            width="2rem"
            height="2rem"
            boxShadow="0 3px 4px -2px rgba(0, 0, 0, 0.18)"
            @click="emits('request:edit')"
        >
            <EditIcon class="edit-icon" />
        </UiButton>
    </header>
</template>

<script setup lang="ts">
import UiButton from '../atoms/UiButton.vue';
import EditIcon from '../atoms/icons/EditIcon.vue';

defineProps<{
    title: string;
    background: string;
    showEditButton?: boolean;
}>();

const emits = defineEmits<{
    (e: 'request:edit'): void;
}>();
</script>

<style scoped>
.title-wrapper {
    width: 100%;
    min-height: 4rem;
    padding: 0.75rem;

    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;

    border-radius: inherit;
    color: var(--color-card-text);

    box-shadow: 0 3px 4px -2px rgba(0, 0, 0, 0.18);
}
h3 {
    max-width: 90%;
}

.edit-icon {
    width: 1.5rem;
    height: 1.5rem;
}
</style>
