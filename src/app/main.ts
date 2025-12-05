import { createApp } from 'vue';
import App from './App.vue';
import { router } from './router';

import './styles/reset.css';
import './styles/global.css';

import { useColorTheme } from '../composables/useColorTheme';

const { initTheme } = useColorTheme();

initTheme();

createApp(App).use(router).mount('#app');
