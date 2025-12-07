<template>
    <AuthFormTemplate>
        <template #title>
            <h2>Регистрация</h2>
        </template>
        <template #inputs>
            <LabeledInput
                label="Email"
                type="email"
                placeholder="cool-email@gmail.com"
                v-model="emailInput"
            ></LabeledInput>
            <LabeledInput
                label="Пароль"
                type="password"
                placeholder="cool-password-54"
                v-model="passwordInput"
            ></LabeledInput>
        </template>
        <template #hint>
            У вас уже есть аккаунт?
            <AppLink to="/login">Войти</AppLink>
        </template>
        <template #actions>
            <UiButton
                size="m"
                @click="register"
            >
                Зарегистрироваться
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

const { registerUser } = useAuth();
const emailInput = ref<string>('');
const passwordInput = ref<string>('');

function register() {
    registerUser(emailInput.value, passwordInput.value);
}
</script>

<style scoped></style>
