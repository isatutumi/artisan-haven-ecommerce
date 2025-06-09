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
            // ANTES: alert(data.message);
            Toastify({
                text: data.message,
                duration: 3000,
                gravity: "top",
                position: "center",
                style: { background: "#4CAF50" } // Verde sucesso
            }).showToast();
            
            // ANTES: window.location.href = './login.html';
            // AGORA: Redireciona após 3 segundos para dar tempo de ler a notificação.
            setTimeout(() => {
                window.location.href = './login.html';
            }, 3000);
            
        } else {
            // ANTES: alert(`Erro: ${data.error}`);
            Toastify({
                text: `Erro: ${data.error}`,
                duration: 3000,
                gravity: "top",
                position: "center",
                style: { background: "#F44336" } // Vermelho erro
            }).showToast();
        }
    } catch (error) {
        console.error('Falha ao tentar registrar:', error);
        // ANTES: alert('Ocorreu um erro ao tentar se registrar. Tente novamente.');
        Toastify({
            text: "Ocorreu um erro de conexão. Tente novamente.",
            duration: 3000,
            gravity: "top",
            position: "center",
            style: { background: "#F44336" } // Vermelho erro
        }).showToast();
    }
});