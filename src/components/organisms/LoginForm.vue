<template>
    <AuthFormTemplate>
        <template #title>
            <h2>Вход</h2>
        </template>
        <template #inputs>
            <LabeledInput
                label="Email"
                type="email"
                placeholder="cool-email@gmail.com"
                :error="formErrors?.email"
                v-model="emailInput"
            ></LabeledInput>
            <LabeledInput
                label="Пароль"
                type="password"
                placeholder="cool-password-54"
                :error="formErrors?.password"
                v-model="passwordInput"
            ></LabeledInput>
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
import { ref } from 'vue';
import AuthFormTemplate from '../molecules/AuthFormTemplate.vue';
import LabeledInput from '../molecules/LabeledInput.vue';
import AppLink from '../molecules/AppLink.vue';
import UiButton from '../atoms/UIButton.vue';
import { useAuth } from '../../composables/useAuth';
import { type Field } from '../../composables/useApi';

const { verifyUser } = useAuth();
const emailInput = ref<string>('');
const passwordInput = ref<string>('');

const formErrors = ref<Partial<Record<Field, string>> | null>(null);

async function login() {
    const errors = await verifyUser(emailInput.value, passwordInput.value);
    formErrors.value = errors
}
</script>

<style scoped></style>
