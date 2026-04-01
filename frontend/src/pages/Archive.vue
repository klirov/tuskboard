<template>
    <HeaderTemplate>
        <template #left-section></template>
        <template #center-section>
            <h1>{{ t('archive') }}</h1>
        </template>
        <template #right-section>
            <SwitchLanguageButton />
            <ThemeToggleButton />
            <ProfileButton />
        </template>
    </HeaderTemplate>
    <main class="archive-container">
        <el-card
            shadow="never"
            style="border: none"
        >
            <el-tabs
                v-model="activeTab"
                class="archive-tabs"
            >
                <el-tab-pane
                    :label="t('tasks')"
                    name="tasks"
                >
                    <ArchiveTable
                        :data="archivedTasks"
                        type="tasks"
                        v-loading="loading"
                        @restore-task="handleRestoreTask"
                    />
                </el-tab-pane>
                <el-tab-pane
                    :label="t('boards')"
                    name="boards"
                >
                    <ArchiveTable
                        :data="archivedBoards"
                        type="boards"
                        v-loading="loading"
                        @restore-board="handleRestoreBoard"
                    />
                </el-tab-pane>
            </el-tabs>
        </el-card>
    </main>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';
import { useArchive } from '../modules/archive/useArchive';
import { useAuthStore } from '../modules/auth/auth.store';

import { ElCard, ElTabs, ElTabPane } from 'element-plus';
import ArchiveTable from '../modules/archive/components/ArchiveTable.vue';
import HeaderTemplate from '../shared/layouts/HeaderTemplate.vue';
import ProfileButton from '../components/molecules/ProfileButton.vue';
import SwitchLanguageButton from '../components/molecules/SwitchLanguageButton.vue';
import ThemeToggleButton from '../components/molecules/ThemeToggleButton.vue';
import type { ActiveStatus, Board, Task } from '../../../shared/types';

const { t } = useI18n();

const { user } = storeToRefs(useAuthStore());

const { archivedBoards, archivedTasks, loading, getArchive, restoreBoard, restoreTask } =
    useArchive(user.value!.id);

const activeTab = ref<'boards' | 'tasks'>('tasks');

function handleRestoreTask(taskId: Task['id'], newStatus: ActiveStatus) {
    restoreTask(taskId, newStatus);
}
function handleRestoreBoard(board: Partial<Board>) {
    restoreBoard(board);
}

onMounted(getArchive);
</script>

<style scoped></style>
