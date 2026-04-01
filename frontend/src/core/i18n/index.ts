import { createI18n } from 'vue-i18n';

export const i18n = createI18n({
    legacy: false,
    locale: 'en',
    fallbackLocale: 'ru',
    messages: {},
});

export async function loadLocale(locale: string) {
    if (i18n.global.availableLocales.value.includes(locale as any)) return

    try {
        const messages = await import(`./locales/${locale}.json`)
        i18n.global.setLocaleMessage(locale, messages.default)
    } catch (e) {
        console.error(`Failed to load ${locale}`, e)
    }
}

export type LocaleMessages = typeof import('./locales/en.json')