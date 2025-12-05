import { createMemoryHistory, createRouter } from 'vue-router';
import HomePage from '../components/pages/HomePage.vue';
import LoginPage from '../components/pages/LoginPage.vue';

const routes = [
    { path: '/', component: HomePage },
    { path: '/login', component: LoginPage },
];

export const router = createRouter({
    history: createMemoryHistory(),
    routes,
});
