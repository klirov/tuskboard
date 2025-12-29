import { createApp } from 'vue';
import { router } from './router';
import { createPinia } from 'pinia';
import { RegleVuePlugin } from '@regle/core';
import { i18n, loadLocale } from '../i18n';
import { useLocaleStore } from '../stores/useLocale';
import App from './App.vue';

import './styles/reset.css';
import './styles/global.css';

import { useColorTheme } from '../composables/useColorTheme';
import { useAuth } from '../composables/useAuth';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(i18n);
app.use(RegleVuePlugin);

const localeStore = useLocaleStore();
const initialLocale = localeStore.locale || navigator.language.split('-')[0] || 'en';

const { initTheme } = useColorTheme();
const { fetchMe } = useAuth(router);

await loadLocale(initialLocale);
i18n.global.locale.value = initialLocale;
await fetchMe();
initTheme();

app.mount('#app');
