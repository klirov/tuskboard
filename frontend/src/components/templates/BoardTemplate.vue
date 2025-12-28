<template>
    <div class="columns">
        <slot name="columns" />
    </div>
</template>

<style scoped>
.columns {
    display: flex;
    justify-content: center;
    align-items: start;

    gap: 1rem;

    padding: 1rem;
}
</style>
