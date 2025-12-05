export function useAuth() {
    async function registerUser(email: string, password: string) {
        const data = { email, password };
        const response = await fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        // ! Переделать обработку ошибок
        if (!response.ok) {
            const error = await response.json().catch(() => null);
            console.log(error ?? new Error(`HTTP ${response.status}`));
        }
        return response.json();
    }
    return { registerUser };
}
