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
                :error="submitted ? r$.email.$errors[0] : undefined"
                v-model="formData.email"
            ></LabeledInput>
            <LabeledInput
                label="Пароль"
                type="password"
                placeholder="cool-password-54"
                :error="submitted ? r$.password.$errors[0] : undefined"
                v-model="formData.password"
            ></LabeledInput>
        </template>
        <template #hint>
            У вас уже есть аккаунт?&nbsp;<AppLink to="/login">Войти</AppLink>
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
import { useRegle } from '@regle/core';
import { email, minLength, required } from '@regle/rules';

const { registerUser } = useAuth();

const formData = ref({
    email: '',
    password: '',
});
const submitted = ref<boolean>(false);

const { r$ } = useRegle(formData, {
    email: { required, email },
    password: { required, minLength: minLength(8) },
});

async function register() {
    submitted.value = true;
    r$.$touch();
    if (!r$.$invalid) await registerUser(formData.value.email, formData.value.password);
}
</script>

<style scoped></style>
