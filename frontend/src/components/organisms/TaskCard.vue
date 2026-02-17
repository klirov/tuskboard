<template>
    <div
        class="task-card"
        @mouseenter="isEditVisible = true"
        @mouseleave="isEditVisible = false"
    >
        <TaskCardHeader
            :title="task.title"
            :background="cardBackground"
        />

        <TaskCardContent
            :task="task"
            :createdAt="createdAt"
        />

        <UiButton
            v-if="isEditVisible"
            size="s"
            padding="0.25rem"
            position="absolute"
            top="1rem"
            right="1rem"
            boxShadow="0 3px 4px -2px rgba(0, 0, 0, 0.18)"
            @click.stop="emits('panel:edit', task)"
        >
            <EditIcon class="edit-icon" />
        </UiButton>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useLocale } from '../../composables/useLocale';
import type { Task } from '../../../../shared/types';
import { makeHueFromId } from '../../utils/GenerateCardColors';
import TaskCardHeader from '../molecules/TaskCardHeader.vue';
import TaskCardContent from '../molecules/TaskCardContent.vue';
import UiButton from '../atoms/UiButton.vue';
import EditIcon from '../atoms/icons/EditIcon.vue';

const props = defineProps<{ task: Task }>();

const emits = defineEmits<{
    (e: 'panel:edit', task: Task): void;
}>();

const { locale } = useLocale();

const isEditVisible = ref(false);

const cardBackground = computed<string>(() => {
    const hue = makeHueFromId(props.task.id);
    return `hsl(${hue}, 70%, 85%)`;
});

const createdAt = computed<ReturnType<typeof Date>>(() => {
    return new Date(props.task.created_at).toLocaleString(locale.value, {
        dateStyle: 'medium',
        timeStyle: 'medium',
    });
});
</script>

<style scoped>
.task-card {
    cursor: grab;
    position: relative;

    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    width: 100%;

    border-radius: 0.5rem;
    color: var(--color-text);
    background-color: var(--color-secondary);
}
.edit-icon {
    width: 2rem;
    height: 2rem;
}
</style>
