<template>
    <BoardTemplate>
        <template #edit-panel>
            <Transition name="slide-from-left">
                <TaskEditPanel
                    v-if="isManagingTask"
                    :editingTask="editingTask"
                    @request:close="toggleTaskManager"
                    @deleteTask="tryToDeleteTask($event)"
                    @editTask="tryToEditTask($event)"
                />
            </Transition>
        </template>
        <template #board-header> <BoardHeader /></template>
        <template #board-columns>
            <BoardColumn
                v-for="status in renderStatuses"
                :key="status"
                :status="status"
                :title="getColumnTitle(status)"
                :tasks="tasksByStatus[status]"
                :loading="loading"
                @request:edit="toggleTaskManager"
                @dnd:locally="moveTasksLocally"
                @dnd:globally="moveTask"
            />
        </template>
    </BoardTemplate>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useTasksStore } from '../stores/useTasks';
import { useNotifications } from '../composables/useNotifications';
import { useBoardTasks } from '../composables/useBoardTasks';
import type { Status, ActiveStatus, Task } from '../../../shared/types';
import TaskEditPanel from '../components/organisms/TaskManagePanel.vue';
import BoardTemplate from '../components/templates/BoardTemplate.vue';
import BoardHeader from '../components/organisms/headers/BoardHeader.vue';
import BoardColumn from '../components/organisms/BoardColumn.vue';
import { useI18n } from 'vue-i18n';

const props = defineProps<{ boardId: number }>();

const tasksStore = useTasksStore();

const { editingTask, isManagingTask } = storeToRefs(tasksStore);

const { toggleTaskManager, editTask, deleteTask } = tasksStore;

const { tasksByStatus, loading, loadTasks, moveTasksLocally } = useBoardTasks(props.boardId);

const { showNotification } = useNotifications();

const renderStatuses = [
    'backlog',
    'to-do',
    'in-progress',
    'awaiting',
] as const satisfies readonly ActiveStatus[];

const { t } = useI18n()

function getColumnTitle(status: ActiveStatus) {
    return t(`task.statuses.${status.toLowerCase()}`)
}

async function moveTask(task: Partial<Task>) {
    try {
        await editTask(task);
    } catch (error) {
        showNotification('error', 'Failed to move task.');
    }
}

async function tryToDeleteTask(taskId: number) {
    try {
        await deleteTask(taskId);

        toggleTaskManager();

        await loadTasks();
    } catch {
        showNotification('error', 'Failed to delete task.');
    }
}

async function tryToEditTask(updatedTask: Partial<Task>) {
    try {
        await editTask(updatedTask);

        toggleTaskManager();

        await loadTasks();
    } catch {
        showNotification('error', 'Failed to edit task. Please try again.');
    }
}

onMounted(() => loadTasks());
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
