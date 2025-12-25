import { createApp } from 'vue';
import { router } from './router';
import { createPinia } from 'pinia';
import { RegleVuePlugin } from '@regle/core';
import App from './App.vue';

import './styles/reset.css';
import './styles/global.css';

import { useColorTheme } from '../composables/useColorTheme';
import { useAuth } from '../composables/useAuth';

const app = createApp(App);
const pinia = createPinia();

app.use(RegleVuePlugin);
app.use(pinia);
app.use(router);

const { initTheme } = useColorTheme();
const { fetchMe } = useAuth(router);

await fetchMe();
initTheme();

app.mount('#app');
