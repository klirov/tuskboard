<template>
    <Transition name="slide-from-left">
        <TaskEditPanel
            v-if="isManagingTask"
            :editingTask="editingTask"
            @request:close="toggleTaskManager"
            @deleteTask="tryToDeleteTask($event)"
            @editTask="tryToEditTask($event)"
        />
    </Transition>
    <BoardHeader />
    <BoardTemplate>
        <template #columns>
            <BoardColumn
                title="Backlog"
                :tasks="tasksByStatus['backlog']"
                :loading="loading"
                @request:edit="toggleTaskManager"
                @dnd:locally="moveTasksLocally($event)"
                @dnd:globally="moveTask($event)"
            />
            <BoardColumn
                title="To Do"
                :tasks="tasksByStatus['to-do']"
                :loading="loading"
                @request:edit="toggleTaskManager"
                @dnd:locally="moveTasksLocally($event)"
                @dnd:globally="moveTask($event)"
            />
            <BoardColumn
                title="In Progress"
                :tasks="tasksByStatus['in-progress']"
                :loading="loading"
                @request:edit="toggleTaskManager"
                @dnd:locally="moveTasksLocally($event)"
                @dnd:globally="moveTask($event)"
            />
            <BoardColumn
                title="Awaiting"
                :tasks="tasksByStatus['awaiting']"
                :loading="loading"
                @request:edit="toggleTaskManager"
                @dnd:locally="moveTasksLocally($event)"
                @dnd:globally="moveTask($event)"
            />
        </template>
    </BoardTemplate>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useTasksStore } from '../stores/useTasksStore';
import { useUserStore } from '../stores/useUserStore';
import { useNotifications } from '../composables/useNotifications';
import BoardColumn from '../components/organisms/BoardColumn.vue';
import TaskEditPanel from '../components/organisms/TaskManagePanel.vue';
import type { Task } from '../../../shared/types';
import BoardHeader from '../components/organisms/BoardHeader.vue';
import BoardTemplate from '../components/templates/BoardTemplate.vue';

const tasksStore = useTasksStore();
const userStore = useUserStore();

const { tasksByStatus, loading, editingTask, isManagingTask } = storeToRefs(tasksStore);
const { user } = storeToRefs(userStore);

const { getUserTasks, toggleTaskManager, editTask, deleteTask, moveTasksLocally } = tasksStore;

const { showNotification } = useNotifications();

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

        if (user.value) await getUserTasks(user.value.id);
    } catch {
        showNotification('error', 'Failed to delete task.');
    }
}

async function tryToEditTask(updatedTask: Partial<Task>) {
    try {
        await editTask(updatedTask);

        toggleTaskManager();

        if (user.value) await getUserTasks(user.value.id);
    } catch {
        showNotification('error', 'Failed to edit task. Please try again.');
    }
}

onMounted(() => {
    if (user.value) tasksStore.getUserTasks(user.value.id);
});
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
