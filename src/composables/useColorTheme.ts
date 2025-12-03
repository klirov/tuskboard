import { ref } from 'vue';

const THEME_KEY = 'theme';
export type Theme = 'light' | 'dark';
const currentTheme = ref<Theme>('light');

const root = document.documentElement;

function applyTheme(theme: Theme) {
    root.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
}

function detectInitialTheme(): Theme {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'light' || saved === 'dark') {
        return saved;
    }
    if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    }
    return 'light';
}

function initTheme() {
    const initial = detectInitialTheme();
    applyTheme(initial);
    currentTheme.value = initial;
}

function toggleTheme() {
    const current = (root.getAttribute('data-theme') as Theme) || 'light';
    const next: Theme = current === 'light' ? 'dark' : 'light';
    applyTheme(next);
    currentTheme.value = next;
}

function getCurrentTheme(): Theme {
    const current = root.getAttribute('data-theme');
    if (current === 'light' || current === 'dark') return current;
    return detectInitialTheme();
}

export function useColorTheme() {
    return {
        currentTheme,
        initTheme,
        toggleTheme,
        getCurrentTheme,
    };
}
