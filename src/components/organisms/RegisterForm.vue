<template>
    <div class="registration-form">
        <legend>Регистрация</legend>
        <section class="inputs-section">
            <LabeledInput
                label="Email"
                type="email"
                placeholder="cool-email@gmail.com"
                v-model="emailInput"
            />
            <LabeledInput
                label="Password"
                type="password"
                placeholder="cool-password-54"
                v-model="passwordInput"
            />
        </section>
        <UiButton
            size="m"
            @click="register"
            >Зарегистрироваться</UiButton
        >
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import UiButton from '../atoms/UIButton.vue';
import LabeledInput from '../molecules/LabeledInput.vue';
import { useAuth } from '../../composables/useAuth';

const { registerUser } = useAuth();
const emailInput = ref<string>('');
const passwordInput = ref<string>('');

function register() {
    registerUser(emailInput.value, passwordInput.value);
}
</script>

<style scoped>
.registration-form {
    width: 25%;
    height: 70%;
    padding: 2rem;

    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    gap: 1rem;

    background-color: var(--color-bg-secondary);
    border-radius: 3rem;
    box-shadow: 1px lightgray;
}

legend {
    font-size: 2.5rem;
}

.inputs-section {
    display: flex;
    flex-direction: column;
    gap: 0.875rem;
}
</style>
