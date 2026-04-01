import { computed, ref } from 'vue';
import type { Board } from '../../../../shared/types';
import { boardsApi } from './boards.api';

export function useBoards(userId: number | null) {
    const boards = ref<Board[]>([]);
    const loading = ref(false);

    const id = computed(() => {
        const id = Number(userId);
        return isNaN(id) ? null : id;
    });

    async function getBoards() {
        if (!id.value) return;
        loading.value = true;

        try {
            boards.value = await boardsApi.getAllByUser(id.value);
        } catch (e) {
            throw new Error(`Failed to load user's boards: ${e}`);
        } finally {
            loading.value = false;
        }
    }

    async function createBoard(boardData: Partial<Board>) {
        if (!id.value) return;

        try {
            await boardsApi.create(id.value, boardData);
            await getBoards();
        } catch (e) {
            throw new Error(`Error creating task: ${e}`);
        }
    }

    async function editBoard(boardData: Partial<Board>) {
        try {
            await boardsApi.update(boardData);
            await getBoards();
        } catch (e) {
            throw new Error(`Error editing board: ${e}`);
        }
    }

    async function deleteBoard(boardId: number) {
        try {
            await boardsApi.delete(boardId);
            await getBoards();
        } catch (e) {
            throw new Error(`Error deleting board: ${e}`);
        }
    }

    return {
        boards,
        loading,
        getBoards,
        createBoard,
        editBoard,
        deleteBoard,
    };
}
