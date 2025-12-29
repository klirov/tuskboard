<template>
    <div class="popover">
        <slot />
    </div>
</template>

<style scoped>
.popover {
    position: absolute;
    top: calc(100% + 1rem);
    right: 0;

    display: flex;
    flex-direction: column;
    align-items: center;

    gap: 1rem;

    padding: 1rem;

    background-color: var(--color-secondary);
    box-shadow: 0 0 0 0.5px var(--color-border);
    border-radius: 1em;
}
</style>
