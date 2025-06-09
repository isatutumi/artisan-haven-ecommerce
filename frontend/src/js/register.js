// frontend/src/js/register.js

document.getElementById('register-form').addEventListener('submit', async (event) => {
    // Previne o comportamento padrão do formulário (que é recarregar a página)
    event.preventDefault();

    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    try {
        const response = await fetch('http://127.0.0.1:5000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        });

        const data = await response.json();

        if (response.ok) { // Status 201 Created
            alert(data.message);
            // Redireciona o usuário para a página de login após o sucesso
            window.location.href = './login.html';
        } else {
            // Mostra a mensagem de erro vinda da API (ex: "Email já cadastrado")
            alert(`Erro: ${data.error}`);
        }
    } catch (error) {
        console.error('Falha ao tentar registrar:', error);
        alert('Ocorreu um erro ao tentar se registrar. Tente novamente.');
    }
});