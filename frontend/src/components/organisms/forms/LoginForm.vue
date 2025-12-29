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
                :error="submitted ? r$.email.$errors[0] : undefined"
                v-model="formData.email"
            />
            <LabeledInput
                label="Пароль"
                type="password"
                placeholder="cool-password-54"
                :error="submitted ? r$.password.$errors[0] : undefined"
                v-model="formData.password"
            />
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
import { useRegle } from '@regle/core';
import { email, minLength, required } from '@regle/rules';
import { useAuth } from '../../../composables/useAuth';
import { useRouter } from 'vue-router';
import AuthFormTemplate from '../../molecules/AuthFormTemplate.vue';
import LabeledInput from '../../molecules/LabeledInput.vue';
import AppLink from '../../molecules/AppLink.vue';
import UiButton from '../../atoms/UiButton.vue';

const router = useRouter();
const { verifyUser } = useAuth(router);

const formData = ref({
    email: '',
    password: '',
});
const submitted = ref<boolean>(false);

const { r$ } = useRegle(formData, {
    email: { required, email },
    password: { required, minLength: minLength(8) },
});

async function login() {
    submitted.value = true;

    r$.$touch();

    if (r$.$invalid) return;

    await verifyUser(formData.value.email, formData.value.password);
}
</script>

<style scoped></style>
