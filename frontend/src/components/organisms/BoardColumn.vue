<template>
    <div class="column">
        <header class="title">
            <h2 v-if="loading">Загрузка задач...</h2>
            <h2>{{ title }}</h2>
        </header>
        <ul>
            <li
                v-for="task in tasks"
                :key="task.id"
            >
                <TaskCard :task="task" />
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import type { Task } from '../../../../shared/types';
import TaskCard from '../molecules/TaskCard.vue';

defineProps<{
    title: string;
    loading: boolean;
    tasks: Task[];
}>();
</script>

<style scoped>
.column {
    display: flex;
    flex-direction: column;

    color: var(--color-text);

    width: 100%;

    gap: 1rem;
}

.title {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5rem;

    border-radius: 0.5rem;

    background-color: var(--color-bg-secondary);
}

ul {
    list-style-type: none;
    padding: 0;
    margin: 0;

    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;

    li {
        width: 100%;
    }
}
</style>
