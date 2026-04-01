<template>
    <div
        class="task-card"
        @mouseenter="isControlsVisible = true"
        @mouseleave="isControlsVisible = false"
    >
        <header
            class="title-wrapper"
            :style="{ 'background-color': cardBackground }"
        >
            <h3>{{ task.title }}</h3>
        </header>

        <div class="content">
            <p v-if="task.description">{{ task.description }}</p>
            <div
                class="tags"
                v-if="task.tags?.length"
            >
                <TaskTag
                    v-for="(tag, index) in task.tags"
                    :key="index"
                    :tag
                />
            </div>
            <small>{{ t('task.created') }}: {{ createdAt }}</small>
        </div>

        <Transition name="v">
            <div
                class="controls"
                v-if="isControlsVisible"
            >
                <UiButton
                    :title="t('cancel')"
                    size="s"
                    padding="0.25rem"
                    backgroundColor="var(--color-danger)"
                    @click.stop="emits('task:mark-as-status', task.id, 'cancelled')"
                >
                    <Cancel class="icon" />
                </UiButton>
                <UiButton
                    :title="t('mark-done')"
                    size="s"
                    padding="0.25rem"
                    @click.stop="emits('task:mark-as-status', task.id, 'done')"
                >
                    <Checkmark class="icon" />
                </UiButton>
                <UiButton
                    :title="t('edit')"
                    size="s"
                    padding="0.25rem"
                    @click.stop="emits('panel:edit', task)"
                >
                    <Edit class="icon" />
                </UiButton>
            </div>
        </Transition>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useLocale } from '../../../core/theme/useLocale';
import type { Task } from '../../../../../shared/types';
import { makeHueFromId } from '../../../shared/utils/generateCardColors';
import UiButton from '../../../components/atoms/UiButton.vue';
import TaskTag from './TaskTag.vue';
import Edit from '../../../shared/ui/icons/Edit.vue';
import Checkmark from '../../../shared/ui/icons/Checkmark.vue';
import Cancel from '../../../shared/ui/icons/Cancel.vue';

const { t } = useI18n();

const props = defineProps<{ task: Task }>();

const emits = defineEmits<{
    (e: 'panel:edit', task: Task): void;
    (e: 'task:mark-as-status', taskId: Task['id'], status: Task['status']): void;
}>();

const { locale } = useLocale();

const isControlsVisible = ref(false);

const cardBackground = computed(() => {
    const hue = makeHueFromId(props.task.id);
    return `hsl(${hue}, 70%, 85%)`;
});

const createdAt = computed(() => {
    return new Date(props.task.created_at).toLocaleString(locale.value, {
        dateStyle: 'medium',
        timeStyle: 'medium',
    });
});
</script>

<style scoped>
.task-card {
    position: relative;

    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    width: 100%;

    border-radius: 0.5rem;
    color: var(--color-text);
    background-color: var(--color-secondary);
}

.title-wrapper {
    cursor: grab;
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

.content {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    padding: 0.5rem 1rem;
}

.tags {
    display: flex;
    gap: 0.5rem;
    align-items: center;
}

small {
    font-size: 0.75rem;
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
