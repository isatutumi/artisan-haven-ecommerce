// frontend/src/js/product.js

document.addEventListener('DOMContentLoaded', () => {
    const productDetailContainer = document.getElementById('product-detail-container');

    const getProductIdFromUrl = () => {
        const params = new URLSearchParams(window.location.search);
        return params.get('id');
    };

    const fetchProductDetails = async () => {
        const productId = getProductIdFromUrl();
        if (!productId) {
            productDetailContainer.innerHTML = '<p class="text-red-500 text-center">ID do produto não encontrado na URL.</p>';
            return;
        }

        try {
            // ANTES: a URL estava hardcoded para localhost
            // AGORA: Usamos a variável global API_BASE_URL + o ID do produto
            const response = await fetch(`${API_BASE_URL}/api/products/${productId}`);
            
            if (!response.ok) {
                throw new Error('Produto não encontrado.');
            }

            const product = await response.json();
            
            const productHtml = `
                <div class="max-w-6xl mx-auto p-4"> 
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
                        <div class="aspect-square w-full max-h-[550px] overflow-hidden rounded-lg shadow-lg">
                            <img src="${product.image_url}" alt="${product.name}" class="w-full h-full object-cover">
                        </div>
                        <div class="flex flex-col h-full">
                            <div>
                                <h1 class="text-4xl font-bold text-gray-800 mb-2">${product.name}</h1>
                                <p class="text-gray-600 text-lg leading-relaxed mb-6">${product.description}</p>
                            </div>
                            <div class="flex-grow"></div>
                            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-auto">
                                <span class="text-3xl sm:text-4xl font-extrabold text-indigo-600 mb-4 sm:mb-0">R$ ${product.price.toFixed(2).replace('.', ',')}</span>
                                <button onclick="addToCart(${product.id}, '${product.name}', ${product.price}, '${product.image_url}')"
                                    class="bg-indigo-600 text-white font-bold px-6 py-3 sm:px-8 sm:py-4 rounded-lg hover:bg-indigo-700 transition-colors w-full sm:w-auto">
                                    Adicionar ao Carrinho
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            productDetailContainer.innerHTML = productHtml;

        } catch (error) {
            console.error('Falha ao buscar detalhes do produto:', error);
            productDetailContainer.innerHTML = `<p class="text-red-500 text-center">${error.message}</p>`;
        }
    };

    fetchProductDetails();
});