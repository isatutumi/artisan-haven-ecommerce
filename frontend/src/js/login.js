// frontend/src/js/login.js

document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
        // ANTES: const response = await fetch('http://127.0.0.1:5000/api/login', { ... });
        // AGORA: Usamos a variável global API_BASE_URL
        const response = await fetch(`${API_BASE_URL}/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) { // Status 200 OK
            Toastify({
                text: data.message,
                duration: 2000,
                gravity: "top",
                position: "center",
                style: { background: "#4CAF50" }
            }).showToast();
            
            // Salva os dados do usuário no localStorage para "lembrar" que ele está logado
            localStorage.setItem('user', JSON.stringify(data.user));
            
            // Redireciona para a página inicial após 2 segundos
            setTimeout(() => {
                window.location.href = './index.html';
            }, 2000);

        } else {
            Toastify({
                text: `Erro: ${data.error}`,
                duration: 3000,
                gravity: "top",
                position: "center",
                style: { background: "#F44336" }
            }).showToast();
        }
    } catch (error) {
        console.error('Falha ao tentar fazer login:', error);
        Toastify({
            text: "Ocorreu um erro de conexão. Tente novamente.",
            duration: 3000,
            gravity: "top",
            position: "center",
            style: { background: "#F44336" }
        }).showToast();
    }
});