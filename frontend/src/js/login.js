// frontend/src/js/login.js

document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
        const response = await fetch('http://127.0.0.1:5000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) { // Status 200 OK
            alert(data.message);
            
            // Salva os dados do usuário no localStorage para "lembrar" que ele está logado
            localStorage.setItem('user', JSON.stringify(data.user));
            
            // Redireciona para a página inicial
            window.location.href = './index.html';
        } else {
            // Mostra a mensagem de erro vinda da API (ex: "Email ou senha inválidos")
            alert(`Erro: ${data.error}`);
        }
    } catch (error) {
        console.error('Falha ao tentar fazer login:', error);
        alert('Ocorreu um erro ao tentar fazer login. Tente novamente.');
    }
});