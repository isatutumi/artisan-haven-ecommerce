// frontend/src/js/auth.js

document.addEventListener('DOMContentLoaded', () => {
    // Referências aos elementos do header
    const authLinksContainer = document.getElementById('auth-links-container');
    const mobileMenuContainer = document.getElementById('mobile-menu');
    const hamburgerBtn = document.getElementById('hamburger-btn');
    
    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;

    // Funções de logout
    const handleLogout = () => {
        localStorage.removeItem('user');
        window.location.href = './index.html';
    };

    const setupLogout = (buttonId) => {
        const logoutButton = document.getElementById(buttonId);
        if (logoutButton) {
            logoutButton.addEventListener('click', handleLogout);
        }
    };

    // Esconde tudo por padrão para evitar "flash" de conteúdo errado
    authLinksContainer.innerHTML = '';
    mobileMenuContainer.innerHTML = '';
    hamburgerBtn.classList.add('hidden');

    if (user) {
        // --- CENÁRIO 1: USUÁRIO ESTÁ LOGADO ---
        const firstName = user.name.split(' ')[0];

        if (user.email === 'admin@artisan.com') {
            // É O ADMIN
            authLinksContainer.classList.add('hidden', 'sm:flex', 'sm:items-center', 'sm:space-x-4');
            authLinksContainer.innerHTML = `
                <span class="font-medium">Olá, ${firstName}!</span>
                <a href="./admin.html" class="text-indigo-600 hover:underline font-semibold">Painel Admin</a>
                <button id="logout-btn-desktop" class="text-red-600 hover:underline font-semibold">Sair</button>
            `;
            hamburgerBtn.classList.remove('hidden');
            mobileMenuContainer.innerHTML = `
                <div class="px-6 pt-2 pb-3 space-y-2">
                    <p class="text-gray-700 px-2 font-semibold">Olá, ${firstName}!</p>
                    <a href="./admin.html" class="block text-gray-800 py-2 hover:bg-gray-100 rounded-md px-2">Painel Admin</a>
                    <button id="logout-btn-mobile" class="block w-full text-left text-red-600 py-2 hover:bg-gray-100 rounded-md px-2">Sair</button>
                </div>
            `;
        } else {
            // É UM USUÁRIO NORMAL
            authLinksContainer.classList.add('flex', 'items-center', 'space-x-2', 'sm:space-x-4');
            authLinksContainer.innerHTML = `
                <span class="font-medium">Olá, ${firstName}!</span>
                <button id="logout-btn-desktop" class="text-red-600 hover:underline font-semibold">Sair</button>
            `;
        }
        setupLogout('logout-btn-desktop');
        setupLogout('logout-btn-mobile');

    } else {
        // --- CENÁRIO 2: USUÁRIO DESLOGADO ---
        authLinksContainer.classList.add('flex', 'items-center', 'space-x-2', 'sm:space-x-4');
        authLinksContainer.innerHTML = `
            <a href="./login.html" class="text-gray-700 hover:text-indigo-600 font-medium">Login</a>
            <a href="./register.html" class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                Registrar
            </a>
        `;
    }
    
    // Lógica do clique no Hambúrguer
    if (hamburgerBtn && mobileMenuContainer) {
        hamburgerBtn.addEventListener('click', () => {
            mobileMenuContainer.classList.toggle('hidden');
        });
    }
});