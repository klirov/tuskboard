<template>
    <el-table
        :data="data"
        style="width: 100%"
        :empty-text="t('archive-is-empty')"
    >
        <template v-if="type === 'boards'">
            <el-table-column
                prop="title"
                :label="t('title')"
                sortable
            />
        </template>
        <template v-else>
            <el-table-column
                prop="title"
                :label="t('title')"
                sortable
            />
            <el-table-column
                prop="status"
                :label="t('status')"
                width="180"
                sortable
                align="center"
            >
                <template #default="scope">
                    <el-tag>{{ scope.row.status.toUpperCase() }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column
                prop="board_title"
                :label="t('board.board-name')"
                align="center"
                sortable
            />
        </template>
        <el-table-column
            :label="t('actions')"
            width="180"
            align="right"
        >
            <template #default="scope">
                <el-button
                    v-if="type === 'boards'"
                    size="small"
                    type="primary"
                    plain
                    @click="$emit('restoreBoard', scope.row)"
                >
                    {{ t('restore') }}
                </el-button>
                <el-dropdown
                    v-else
                    trigger="click"
                    @command="
                        (status: Status) =>
                            $emit('restoreTask', scope.row.id, status)
                    "
                >
                    <el-button
                        size="small"
                        type="primary"
                        plain
                    >
                        {{ t('restore')
                        }}<el-icon class="el-icon--right"><Arrow /></el-icon>
                    </el-button>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item command="backlog">{{
                                t('task.statuses.backlog')
                            }}</el-dropdown-item>
                            <el-dropdown-item command="to-do">{{
                                t('task.statuses.to-do')
                            }}</el-dropdown-item>
                            <el-dropdown-item command="in-progress">{{
                                t('task.statuses.in-progress')
                            }}</el-dropdown-item>
                            <el-dropdown-item command="awaiting">{{
                                t('task.statuses.awaiting')
                            }}</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </template>
        </el-table-column>
    </el-table>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import Arrow from '../../../shared/ui/icons/Arrow.vue';
import type { Board, Status } from '../../../../../shared/types';
import {
    ElTable,
    ElTableColumn,
    ElDropdown,
    ElDropdownMenu,
    ElDropdownItem,
    ElButton,
} from 'element-plus';

const { t } = useI18n();

defineProps<{
    data: any[];
    type: 'boards' | 'tasks';
}>();

defineEmits<{
    (e: 'restoreBoard', row: Board): void;
    (e: 'restoreTask', rowId: any, status: Status): void;
}>();
</script>
