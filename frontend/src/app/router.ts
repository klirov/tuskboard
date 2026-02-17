import {
    createRouter,
    createWebHistory,
    type NavigationGuardNext,
    type RouteLocationNormalized,
    type RouteLocationNormalizedLoaded,
    type RouteRecordRaw,
} from 'vue-router';
import { useUserStore } from '../stores/user';
import { useBoards } from '../composables/useBoards';
import { useAuth } from '../composables/useAuth';

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
        name: 'board',
        component: () => import('../pages/Board.vue'),
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
        const { boards, getBoards } = useBoards(userStore.user?.id ?? null);

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
