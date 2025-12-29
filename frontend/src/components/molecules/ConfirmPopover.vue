<template>
    <UiPopover>
        <p v-if="confirmationText">{{ confirmationText }}</p>
        <div class="btns">
            <UiButton @click="emits('popover:cancel')">{{t('no')}}</UiButton>
            <UiButton
                background-color="var(--color-danger)"
                @click="emits('popover:confirm')"
                >{{t('yes')}}</UiButton
            >
        </div>
    </UiPopover>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import UiButton from '../atoms/UiButton.vue';
import UiPopover from '../atoms/UiPopover.vue';

export type ConfirmPopoverProps = {
    confirmationText?: string;
};
defineProps<ConfirmPopoverProps>();

const emits = defineEmits<{
    (e: 'popover:cancel'): void;
    (e: 'popover:confirm'): void;
}>();

const { t } = useI18n();
</script>

<style scoped>
.btns {
    display: flex;
    justify-content: center;
    gap: 1rem;
    width: 100%;
}
</style>
