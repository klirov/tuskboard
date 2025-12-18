import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../pages/HomePage.vue';
import LoginPage from '../pages/LoginPage.vue';
import RegisterPage from '../pages/RegisterPage.vue';
import ProfilePage from '../pages/ProfilePage.vue';
import DashboardPage from '../pages/DashboardPage.vue';

const routes = [
    { path: '/', component: HomePage },
    { path: '/login', component: LoginPage },
    { path: '/register', component: RegisterPage },
    { path: '/profile', component: ProfilePage },
    { path: '/dashboard', component: DashboardPage },
];

export const router = createRouter({
    history: createWebHistory(),
    routes,
});
