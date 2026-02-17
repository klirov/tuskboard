<template>
    <BoardTemplate>
        <template #edit-panel>
            <Transition name="slide-from-left">
                <TaskManagePanel
                    v-if="isOpen"
                    :editingTask="editingItem"
                    :mode="mode"
                    @panel:close="close"
                    @task:create="tryToCreateTask"
                    @task:delete="tryToDeleteTask"
                    @task:edit="tryToEditTask"
                    :board-id="boardId"
                />
            </Transition>
        </template>
        <template #board-header>
            <HeaderTemplate>
                <template #left-section>
                    <UiButton @click="router.push('/boards')"> {{ t('back-to-boards') }} </UiButton>
                </template>
                <template #center-section>
                    <UiButton @click="openCreate">{{ t('task.create-new-task') }}</UiButton>
                </template>
                <template #right-section>
                    <SwitchLanguageButton /> <ThemeToggleButton /> <ProfileButton />
                </template>
            </HeaderTemplate>
        </template>
        <template #board-columns>
            <BoardColumn
                v-for="status in renderStatuses"
                :key="status"
                :status="status"
                :title="getColumnTitle(status)"
                :tasks="tasksByStatus[status]"
                :loading="loading"
                @panel:edit="toggle"
                @dnd:locally="moveTasksLocally"
                @dnd:globally="moveTask"
            />
        </template>
    </BoardTemplate>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useNotifications } from '../composables/useNotifications';
import { useTasks } from '../composables/useTasks';
import { useManageEntityPanel } from '../composables/useManageEntityPanel';
import type { Status, ActiveStatus, Task } from '../../../shared/types';

import BoardTemplate from '../components/templates/BoardTemplate.vue';
import TaskManagePanel from '../components/organisms/panels/TaskManagePanel.vue';
import BoardColumn from '../components/organisms/BoardColumn.vue';
import HeaderTemplate from '../components/templates/HeaderTemplate.vue';
import SwitchLanguageButton from '../components/molecules/SwitchLanguageButton.vue';
import ThemeToggleButton from '../components/molecules/ThemeToggleButton.vue';
import ProfileButton from '../components/molecules/ProfileButton.vue';
import UiButton from '../components/atoms/UiButton.vue';

const props = defineProps<{ boardId: number }>();

const router = useRouter();

const { t } = useI18n();

const { tasksByStatus, loading, editTask, createTask, deleteTask, getTasks, moveTasksLocally } =
    useTasks(props.boardId);

const { isOpen, editingItem, mode, openCreate, close, toggle } =
    useManageEntityPanel<Task>();

const { showNotification } = useNotifications();

const renderStatuses = [
    'backlog',
    'to-do',
    'in-progress',
    'awaiting',
] as const satisfies readonly ActiveStatus[];

function getColumnTitle(status: ActiveStatus) {
    return t(`task.statuses.${status.toLowerCase()}`);
}

async function moveTask(task: Partial<Task>) {
    try {
        await editTask(task);
    } catch (error) {
        showNotification('error', 'Failed to move task.');
    }
}

async function tryToCreateTask(task: Partial<Task>) {
    try {
        await createTask(task, props.boardId);

        toggle();

        await getTasks();
    } catch {
        showNotification('error', 'Failed to create task.');
    }
}

async function tryToDeleteTask(taskId: number) {
    try {
        await deleteTask(taskId);

        toggle();

        await getTasks();
    } catch {
        showNotification('error', 'Failed to delete task.');
    }
}

async function tryToEditTask(updatedTask: Partial<Task>) {
    try {
        await editTask(updatedTask);

        toggle();

        await getTasks();
    } catch {
        showNotification('error', 'Failed to edit task. Please try again.');
    }
}

onMounted(getTasks);
</script>

<style scoped>
.slide-from-left-enter-active,
.slide-from-left-leave-active {
    transition:
        transform 0.25s cubic-bezier(0.32, 0.72, 0, 1),
        opacity 0.25s ease,
        box-shadow 0.25s ease;
}

.slide-from-left-enter-from,
.slide-from-left-leave-to {
    transform: translateX(-100%);
    opacity: 0.4;
    box-shadow: none;
}

.slide-from-left-enter-to,
.slide-from-left-leave-from {
    transform: translateX(0);
    opacity: 1;
    box-shadow: -12px 0 25px rgba(0, 0, 0, 0.18);
}
</style>
