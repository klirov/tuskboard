import { createApp } from 'vue';
import { router } from './router';
import { createPinia } from 'pinia';
import { RegleVuePlugin } from '@regle/core';
import ElementPlus from 'element-plus'
import { i18n, loadLocale } from '../core/i18n';
import { useLocale } from '../core/theme/useLocale';
import App from './App.vue';

import './styles/reset.css';
import './styles/global.css';
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css';

import { useColorTheme } from '../core/theme/useColorTheme';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(i18n);
app.use(RegleVuePlugin);
app.use(ElementPlus);

const { locale } = useLocale();
const initialLocale = locale.value || navigator.language.split('-')[0] || 'en';

const { initTheme } = useColorTheme();

await loadLocale(initialLocale);
i18n.global.locale.value = initialLocale;
initTheme();

app.mount('#app');
