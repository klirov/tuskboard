<template>
    <div class="select-wrapper">
        <select v-model="model">
            <option
                value=""
                disabled
                selected
            >
                {{ title }}
            </option>
            <option
                v-for="(option, index) in options"
                :key="index"
            >
                {{ option }}
            </option>
        </select>
    </div>
</template>

<script setup lang="ts">
const model = defineModel<string>();

export type SelectProps = {
    title: string;
    options: string[];
};

defineProps<SelectProps>();
</script>

<style scoped>
.select-wrapper {
    position: relative;
    width: 100%;
}
select {
    width: 100%;
    padding: 0.5rem 2.5rem 0.5rem 1rem;

    font-size: 1rem;
    border-radius: 1em;

    border: 1px solid var(--color-border);
    color: var(--color-text);
    background-color: var(--color-secondary);

    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
}

select::-ms-expand {
    display: none;
}

.select-wrapper::after {
    content: '▼';
    position: absolute;
    right: 1em;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    color: var(--color-text);
    font-size: 0.875rem;
}
select:focus-visible {
    outline: none;
}
option {
    color: var(--color-text);
    background-color: var(--color-bg);
}
</style>
