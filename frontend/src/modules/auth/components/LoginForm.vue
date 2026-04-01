<template>
    <AuthFormTemplate>
        <template #title>
            <h2>Вход</h2>
        </template>
        <template #inputs>
            <LabeledField
                required
                :error="submitted ? r$.email.$errors[0] : undefined"
            >
                <template #label>{{ t('email') }}</template>
                <template #field="slotProps">
                    <UiInput
                        v-bind="slotProps"
                        type="email"
                        placeholder="cool-email@gmail.com"
                        v-model="formData.email"
                    />
                </template>
            </LabeledField>

            <LabeledField
                required
                :error="submitted ? r$.password.$errors[0] : undefined"
            >
                <template #label>{{ t('password') }}</template>
                <template #field="slotProps">
                    <UiInput
                        v-bind="slotProps"
                        type="password"
                        placeholder="cool-password-54"
                        v-model="formData.password"
                    />
                </template>
            </LabeledField>
        </template>
        <template #hint>
            Ещё нет аккаунта?&nbsp;<AppLink to="/register">Зарегистрироваться</AppLink>
        </template>
        <template #actions>
            <UiButton
                size="m"
                width="12rem"
                @click="login"
            >
                Войти
            </UiButton>
        </template>
    </AuthFormTemplate>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRegle } from '@regle/core';
import { email, minLength, required } from '@regle/rules';
import { useAuth } from '../useAuth';
import { useRouter } from 'vue-router';
import AuthFormTemplate from '../../../components/molecules/AuthFormTemplate.vue';
import AppLink from '../../../components/molecules/AppLink.vue';
import UiButton from '../../../components/atoms/UiButton.vue';
import LabeledField from '../../../components/molecules/LabeledField.vue';
import UiInput from '../../../components/atoms/UiInput.vue';

const { t } = useI18n();

const router = useRouter();
const { verifyUser } = useAuth(router);

const formData = reactive({
    email: '',
    password: '',
});
const submitted = ref(false);

const { r$ } = useRegle(formData, {
    email: { required, email },
    password: { required, minLength: minLength(8) },
});

async function login() {
    submitted.value = true;

    r$.$touch();

    if (r$.$invalid) return;

    await verifyUser(formData.email, formData.password);
}
</script>
