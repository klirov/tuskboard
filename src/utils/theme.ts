const THEME_KEY = 'theme';
export type Theme = 'light' | 'dark';

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

export function initTheme() {
    const initial = detectInitialTheme();
    applyTheme(initial);
}

export function toggleTheme() {
    const current = (root.getAttribute('data-theme') as Theme) || 'light';
    const next: Theme = current === 'light' ? 'dark' : 'light';
    applyTheme(next);
}

export function getCurrentTheme(): Theme {
    const current = root.getAttribute('data-theme');
    if (current === 'light' || current === 'dark') return current;
    return detectInitialTheme();
}
