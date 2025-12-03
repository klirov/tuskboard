import { createApp } from 'vue';
import App from './App.vue';

import './styles/reset.css';
import './styles/global.css';

import { useColorTheme } from '../composables/useColorTheme';

const { initTheme } = useColorTheme();

initTheme();

createApp(App).mount('#app');
