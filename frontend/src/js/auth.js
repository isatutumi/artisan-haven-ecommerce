// frontend/src/js/auth.js

document.addEventListener('DOMContentLoaded', () => {
    const authLinksContainer = document.getElementById('auth-links');
    const userString = localStorage.getItem('user');

    if (userString) {
        // CASO 1: O USUÁRIO ESTÁ LOGADO
        const user = JSON.parse(userString);

        let finalHTML = `<span class="text-gray-800 font-medium">Olá, ${user.name}!</span>`;

        // --- NOVA LÓGICA DE ADMIN ---
        // Verifica se o email do usuário logado é o do administrador
        if (user.email === 'admin@artisan.com') {
            // Se for, adiciona o link para o Painel Administrativo
            finalHTML += `
                <a href="./admin.html" class="text-sm text-indigo-600 hover:underline font-semibold ml-4">
                    Painel Admin
                </a>
            `;
        }
        // --- FIM DA NOVA LÓGICA ---

        // Adiciona o botão de Sair, que é comum a todos os usuários logados
        finalHTML += `
            <button id="logout-btn" class="text-sm text-red-600 hover:underline font-semibold ml-4">
                Sair
            </button>
        `;
        
        authLinksContainer.innerHTML = finalHTML;

        // Adiciona a funcionalidade ao botão "Sair" (código existente)
        const logoutButton = document.getElementById('logout-btn');
        if (logoutButton) {
            logoutButton.addEventListener('click', () => {
                localStorage.removeItem('user');
                window.location.href = './index.html';
            });
        }
    } else {
        // CASO 2: O USUÁRIO NÃO ESTÁ LOGADO (código existente, sem alterações)
        authLinksContainer.innerHTML = `
            <a href="./login.html" class="text-gray-700 hover:text-indigo-600 font-medium">Login</a>
            <a href="./register.html" class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors text-sm font-semibold">
                Registrar
            </a>
        `;
    }
});