<template>
    <ProfileHeader />
    <ProfileContent>
        <template #boards>
            <BoardCard
                v-for="board in userBoards"
                :key="board.id"
                :board="board"
                @click="router.push(`/board/${board.id}`)"
            />
        </template>
    </ProfileContent>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { useBoardsStore } from '../stores/useBoards';
import { useUserStore } from '../stores/useUser';
import BoardCard from '../components/organisms/BoardCard.vue';
import ProfileHeader from '../components/organisms/headers/ProfileHeader.vue';
import ProfileContent from '../components/organisms/ProfileContent.vue';

const router = useRouter();

const boardsStore = useBoardsStore();
const userStore = useUserStore();

const { userBoards } = storeToRefs(boardsStore);
const { user } = storeToRefs(userStore);

const { getUserBoards } = boardsStore;

onMounted(() => {
    if (user.value) getUserBoards(user.value.id);
});
</script>

<style scoped></style>
