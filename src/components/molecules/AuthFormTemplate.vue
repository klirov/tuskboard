<template>
    <div class="auth-form">
        <header class="auth-form__header">
            <slot name="title" />
        </header>

        <section class="auth-form__inputs">
            <slot name="inputs" />
        </section>

        <p class="auth-form__hint transition-color">
            <slot name="hint" />
        </p>

        <footer class="auth-form__actions">
            <slot name="actions" />
        </footer>
    </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.auth-form {
    width: max-content;
    height: max-content;
    padding: 4rem 5rem;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: 3rem;

    background-color: var(--color-bg-secondary);
    border-radius: 2rem;
}

.auth-form__header {
    font-size: 2rem;
}

.auth-form__inputs {
    display: flex;
    flex-direction: column;
    gap: 0.875rem;
}

.auth-form__hint {
    font-size: 0.875rem;
    color: var(--color-text);
}

.auth-form__actions {
    display: flex;
    justify-content: center;
}
</style>
