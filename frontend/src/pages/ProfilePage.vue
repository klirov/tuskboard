<template>
    <Transition name="slide-from-left">
        <TaskEditPanel
            v-if="isManagingTask"
            :editingTask="editingTask"
            @request:close="closeTaskManager"
        />
    </Transition>
    <div class="wrapper">
        <BoardColumn
            title="To Do"
            :tasks="tasksByStatus['to-do']"
            :loading
            @request:edit="openTaskManager"
        />
        <BoardColumn
            title="In Progress"
            :tasks="tasksByStatus['in-progress']"
            :loading
            @request:edit="openTaskManager"
        />
        <BoardColumn
            title="Awaiting"
            :tasks="tasksByStatus['awaiting']"
            :loading
            @request:edit="openTaskManager"
        />
        <BoardColumn
            title="Done"
            :tasks="tasksByStatus['done']"
            :loading
            @request:edit="openTaskManager"
        />
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useTasksStore } from '../stores/useTasksStore';
import { useUserStore } from '../stores/useUserStore';
import BoardColumn from '../components/organisms/BoardColumn.vue';
import TaskEditPanel from '../components/organisms/TaskManagePanel.vue';

const tasksStore = useTasksStore();
const userStore = useUserStore();

const { tasksByStatus, loading, editingTask, isManagingTask } = storeToRefs(tasksStore);
const { user } = storeToRefs(userStore);

const { openTaskManager, closeTaskManager } = tasksStore;

onMounted(() => {
    if (user.value) tasksStore.getUserTasks(user.value.id);
});
</script>

<style scoped>
.slide-from-left-enter-active,
.slide-from-left-leave-active {
    transition:
        transform 0.28s cubic-bezier(0.32, 0.72, 0, 1),
        opacity 0.28s ease,
        box-shadow 0.28s ease;
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
.wrapper {
    display: flex;
    justify-content: center;
    align-items: start;

    gap: 1rem;

    padding: 1rem;
}
</style>
