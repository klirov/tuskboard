<template>
    <div class="labeled-input">
        <header>
            <label :for="id">
                <slot name="label">
                    {{ label }}
                </slot>
            </label>
        </header>
    </div>
    <div
        class="tag-input-container"
        @click="focusInput"
    >
        <TaskTag
            v-for="(tag, index) in tags"
            :key="tag"
            class="tag-chip"
            :tag="tag"
        >
            <button
                type="button"
                class="tag-remove"
                @click.stop="removeTag(index)"
            >
                ×
            </button>
        </TaskTag>

        <input
            ref="inputRef"
            :id="id"
            v-model="currentInput"
            type="text"
            :placeholder="placeholder || `${t('task.enter-tag')}... (Space/Enter)`"
            class="tag-input-field"
            @keydown="handleKeydown"
            @paste="handlePaste"
        />
    </div>
</template>

<script setup lang="ts">
import { nextTick, ref, useTemplateRef } from 'vue';
import { useI18n } from 'vue-i18n';
import TaskTag from '../atoms/TaskTag.vue';

const { t } = useI18n();

const props = defineProps<{
    label: string;
    placeholder?: string;
}>();

const tags = defineModel<string[]>({
    required: false,
    default: () => [],
});

const id = `tag-input-${crypto.randomUUID()}`;
const inputRef = useTemplateRef('inputRef');
const currentInput = ref('');


function addTag(value: string) {
    const trimmed = value.trim();
    if (!trimmed) return;
    if (tags.value.includes(trimmed)) return;

    tags.value.push(trimmed);
    currentInput.value = '';
}

function removeTag(index: number) {
    tags.value.splice(index, 1);

    nextTick(() => inputRef.value?.focus());
}

function focusInput() {
    inputRef.value?.focus();
}

function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (currentInput.value.trim()) {
            addTag(currentInput.value);
        }
    } else if (e.key === 'Backspace' && !currentInput.value && tags.value.length > 0) {
        removeTag(tags.value.length - 1);
    }
}

function handlePaste(e: ClipboardEvent) {
    e.preventDefault();
    const text = e.clipboardData?.getData('text') || '';
    if (!text) return;

    const pastedTags = text
        .split(/[\s,;]+/)
        .map((t) => t.trim())
        .filter(Boolean);

    pastedTags.forEach(addTag);
}
</script>

<style scoped>
.labeled-input {
    width: 100%;

    color: var(--color-text);
}
input:focus-visible {
    outline: none;
}
input::placeholder {
    color: var(--color-placeholder);
}
.tag-input-container {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5rem;

    padding: 0.75em 1em;
    border-radius: 1em;

    border: 1px solid var(--color-border);
    color: var(--color-text);
    background-color: var(--color-secondary);
}
.tag-input-field {
    all: unset;
    flex: 1 1 auto;
    min-width: 8rem;
}
.tag-remove {
    all: unset;
    display: grid;
    place-items: center;
    font-size: 1rem;
    cursor: pointer;
}
</style>
