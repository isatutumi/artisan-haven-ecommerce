document.addEventListener('DOMContentLoaded', () => {

    const productGrid = document.getElementById('product-grid');

    async function fetchProducts() {
        try {
            const response = await fetch('http://127.0.0.1:5000/api/products');
            if (!response.ok) {
                throw new Error('A resposta da rede não foi ok');
            }
            const products = await response.json();
            productGrid.innerHTML = '';

            products.forEach(product => {
                // MUDANÇA AQUI: Adicionamos a classe inicial da nossa animação
                const productCard = `
                    <a href="./produto.html?id=${product.id}" class="group flex flex-col bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300 card-fade-in">
                        
                        <div class="aspect-square w-full overflow-hidden">
                            <img src="${product.image_url}" alt="${product.name}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300">
                        </div>
                        
                        <div class="p-6 flex flex-col flex-grow">
                            <h3 class="text-xl font-semibold text-gray-800 mb-2">${product.name}</h3>
                            <p class="text-gray-600 mb-4 line-clamp-3 flex-grow">${product.description}</p>
                            <div class="flex justify-between items-center mt-auto pt-4 border-t">
                                <span class="text-2xl font-bold text-indigo-600">R$ ${product.price.toFixed(2).replace('.', ',')}</span>
                                <button onclick="event.preventDefault(); event.stopPropagation(); addToCart(${product.id}, '${product.name}', ${product.price}, '${product.image_url}')"
                                    class="bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 transition-colors z-10">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </a>
                `;
                productGrid.innerHTML += productCard;
            });

            // MUDANÇA AQUI: Chamamos a função para observar os cards recém-criados
            observeCards();

        } catch (error) {
            console.error('Falha ao buscar produtos:', error);
            productGrid.innerHTML = '<p class="text-red-500">Erro ao carregar os produtos. Tente novamente mais tarde.</p>';
        }
    }

    fetchProducts();
});

// ===== CÓDIGO DA ANIMAÇÃO ADICIONADO AQUI FORA =====

// Cria o "observador" que vai vigiar os cards
const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        // Se o card entrou na tela (isIntersecting)
        if (entry.isIntersecting) {
            // Adiciona a classe que dispara a animação CSS
            entry.target.classList.add('is-visible');
            // Para de observar este card, pois a animação só precisa acontecer uma vez
            fadeInObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1 // A animação começa quando pelo menos 10% do card estiver visível
});

// Função que encontra todos os cards e manda o observador vigiá-los
function observeCards() {
    const cards = document.querySelectorAll('.card-fade-in');
    cards.forEach(card => {
        fadeInObserver.observe(card);
    });
}