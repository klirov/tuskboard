<template>
    <div
        class="task-card"
        @mouseenter="isControlsVisible = true"
        @mouseleave="isControlsVisible = false"
    >
        <TaskCardHeader
            :title="task.title"
            :background="cardBackground"
        />

        <TaskCardContent
            :task="task"
            :createdAt="createdAt"
        />

        <Transition name="v">
            <div
                class="controls"
                v-if="isControlsVisible"
            >
                <UiButton
                    size="s"
                    padding="0.25rem"
                    @click.stop="emits('panel:edit', task)"
                >
                    <EditIcon class="icon" />
                </UiButton>
                <UiButton
                    size="s"
                    padding="0.25rem"
                    @click.stop="emits('task:mark-done', task.id)"
                >
                    <Checkmark class="icon" />
                </UiButton>
            </div>
        </Transition>
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
import Checkmark from '../atoms/icons/Checkmark.vue';

const props = defineProps<{ task: Task }>();

const emits = defineEmits<{
    (e: 'panel:edit', task: Task): void;
    (e: 'task:mark-done', taskId: Task['id']): void;
}>();

const { locale } = useLocale();

const isControlsVisible = ref(false);

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
.controls {
    position: absolute;
    top: 0.75rem;
    right: 0.75rem;

    display: flex;
    gap: 0.5rem;
}

.icon {
    width: 1.5rem;
    aspect-ratio: 1 / 1;
}
.v-enter-active,
.v-leave-active,
.v-appear-active {
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.v-enter-from,
.v-leave-to,
.v-appear-from {
    opacity: 0;
    transform: translateY(10px);
}
</style>
