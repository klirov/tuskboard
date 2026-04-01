import {
    createRouter,
    createWebHistory,
    type NavigationGuardNext,
    type RouteLocationNormalized,
    type RouteLocationNormalizedLoaded,
    type RouteRecordRaw,
} from 'vue-router';
import { useAuthStore } from '../modules/auth/auth.store';
import { useAuth } from '../modules/auth/useAuth';
import { useBoards } from '../modules/boards/useBoards';

const routes: RouteRecordRaw[] = [
    { path: '/', component: () => import('../pages/Home.vue') },
    { path: '/login', component: () => import('../pages/Login.vue') },
    { path: '/register', component: () => import('../pages/Register.vue') },
    {
        path: '/profile',
        component: () => import('../pages/Profile.vue'),
        meta: { requiresAuth: true },
    },
    {
        path: '/boards',
        component: () => import('../pages/Boards.vue'),
        meta: { requiresAuth: true },
    },
    {
        path: '/board/:boardId(\\d+)',
        component: () => import('../pages/Board.vue'),
        props: (route: RouteLocationNormalizedLoaded) => ({
            boardId: Number(route.params.boardId),
        }),
        meta: { requiresAuth: true },
    },
    {
        path: '/archive',
        component: () => import('../pages/Archive.vue'),
        meta: { requiresAuth: true },
    },
];

export const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(
    async (to: RouteLocationNormalized, _: RouteLocationNormalized, next: NavigationGuardNext) => {
        const userStore = useAuthStore();

        if (!userStore.user) {
            try {
                await useAuth(router).fetchMe();
            } catch {}
        }

        const isAuthenticated = Boolean(userStore.user);

        if (to.meta.requiresAuth) {
            if (!isAuthenticated) return next('/login');

            if (to.name === 'board') {
                const boardId = Number(to.params.boardId);

                const { boards, getBoards } = useBoards(userStore.user?.id ?? null);

                if (boards.value.length === 0) {
                    await getBoards();
                }

                const ownsBoard = boards.value.some((b) => b.id === boardId);

                if (!ownsBoard) {
                    return next({ path: '/profile' });
                }
            }
        }

        if (isAuthenticated && ['/login', '/register'].includes(to.path)) {
            return next('/profile');
        }

        next();
    },
);
