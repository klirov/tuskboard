import { createApp } from 'vue';
import App from './App.vue';

import './styles/reset.css';
import './styles/global.css';

import { initTheme } from '../utils/theme';

initTheme();

createApp(App).mount('#app');
