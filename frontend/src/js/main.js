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
                // O card continua envolvido por um link, mas o botão agora tem uma ação específica.
                const productCard = `
                    <a href="./produto.html?id=${product.id}" class="block bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300">
                        <img src="${product.image_url}" alt="${product.name}" class="w-full h-56 object-cover">
                        <div class="p-6">
                            <h3 class="text-xl font-semibold text-gray-800 mb-2">${product.name}</h3>
                            <p class="text-gray-600 mb-4 line-clamp-3">${product.description}</p>
                            <div class="flex justify-between items-center">
                                <span class="text-2xl font-bold text-indigo-600">R$ ${product.price.toFixed(2).replace('.', ',')}</span>
                                
                                <button 
                                    onclick="event.preventDefault(); event.stopPropagation(); addToCart(${product.id}, '${product.name}', ${product.price}, '${product.image_url}')"
                                    class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors z-10">
                                    Adicionar ao Carrinho
                                </button>
                                </div>
                        </div>
                    </a>
                `;
                productGrid.innerHTML += productCard;
            });

        } catch (error) {
            console.error('Falha ao buscar produtos:', error);
            productGrid.innerHTML = '<p class="text-red-500">Erro ao carregar os produtos. Tente novamente mais tarde.</p>';
        }
    }

    fetchProducts();
});