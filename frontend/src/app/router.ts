import {
    createRouter,
    createWebHistory,
    type NavigationGuardNext,
    type RouteLocationNormalized,
    type RouteLocationNormalizedLoaded,
    type RouteRecordRaw,
} from 'vue-router';
import { useUserStore } from '../stores/useUser';
import { useBoardsStore } from '../stores/useBoards';
import { useAuth } from '../composables/useAuth';

const routes: RouteRecordRaw[] = [
    { path: '/', component: () => import('../pages/HomePage.vue') },
    { path: '/login', component: () => import('../pages/LoginPage.vue') },
    { path: '/register', component: () => import('../pages/RegisterPage.vue') },
    { path: '/profile', component: () => import('../pages/ProfilePage.vue') },
    {
        path: '/board/:boardId(\\d+)',
        name: 'board',
        component: () => import('../pages/BoardPage.vue'),
        props: (route: RouteLocationNormalizedLoaded) => ({
            boardId: Number(route.params.boardId),
        }),
        meta: { requiresAuth: true },
    },
];

export const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(
    async (to: RouteLocationNormalized, _: RouteLocationNormalized, next: NavigationGuardNext) => {
        const userStore = useUserStore();
        const boardsStore = useBoardsStore();

        if (to.meta.requiresAuth || to.name === 'board' || to.path.startsWith('/profile')) {
            if (!userStore.user) {
                try {
                    await useAuth(router).fetchMe();
                } catch {
                    return next({ path: '/login', query: { redirect: to.fullPath } });
                }
            }
            if (!userStore.user) {
                return next({ path: '/login', query: { redirect: to.fullPath } });
            }
        }

        if (to.name === 'board') {
            const boardId = Number(to.params.boardId);

            if (boardsStore.userBoards.length === 0) {
                await boardsStore.getUserBoards(userStore.user!.id);
            }

            const ownsBoard = boardsStore.userBoards.some((b) => b.id === boardId);

            if (!ownsBoard) {
                return next({ path: '/profile' });
            }
        }
        next();
    },
);
