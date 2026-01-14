import { ref, watch } from 'vue';
import { i18n, loadLocale } from '../i18n';

const locale = ref(localStorage.getItem('locale') || 'en');

watch(locale, (newLocale) => {
    localStorage.setItem('locale', newLocale);
});

export function useLocale() {
    async function setLocale(newLocale: string) {
        await loadLocale(newLocale);
        locale.value = newLocale;
        i18n.global.locale.value = newLocale;
    }

    return {
        locale,
        setLocale,
    };
}
