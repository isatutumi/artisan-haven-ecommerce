document.addEventListener('DOMContentLoaded', () => {
    
    const productDetailContainer = document.getElementById('product-detail-container');

    // Função para extrair o ID do produto da URL
    function getProductIdFromUrl() {
        // URLSearchParams é uma API do navegador que facilita o trabalho com query strings
        const params = new URLSearchParams(window.location.search);
        return params.get('id'); // Retorna o valor do parâmetro 'id'
    }

    // Função para buscar e renderizar os detalhes de um produto específico
    async function fetchProductDetails() {
        const productId = getProductIdFromUrl();

        // Se não houver ID na URL, exibe um erro
        if (!productId) {
            productDetailContainer.innerHTML = '<p class="text-red-500 text-center">ID do produto não encontrado na URL.</p>';
            return;
        }

        try {
            // Chama a API com o ID específico do produto
            const response = await fetch(`http://127.0.0.1:5000/api/products/${productId}`);
            if (!response.ok) {
                throw new Error('Produto não encontrado.');
            }
            const product = await response.json();

            // Gera o HTML com os detalhes do produto
            const productHtml = `
                <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                    <div>
                        <img src="${product.image_url}" alt="${product.name}" class="w-full h-auto rounded-lg shadow-lg">
                    </div>
                    <div class="flex flex-col h-full">
                        <h1 class="text-4xl font-bold text-gray-800 mb-4">${product.name}</h1>
                        <p class="text-gray-600 text-lg leading-relaxed mb-6 flex-grow">${product.description}</p>
                        <div class="flex items-center justify-between mt-auto">
                            <span class="text-4xl font-extrabold text-indigo-600">R$ ${product.price.toFixed(2).replace('.', ',')}</span>
                            
                            <button 
                                onclick="addToCart(${product.id}, '${product.name}', ${product.price}, '${product.image_url}')"
                                class="bg-indigo-600 text-white font-bold px-8 py-4 rounded-lg hover:bg-indigo-700 transition-colors text-lg">
                                Adicionar ao Carrinho
                            </button>
                            </div>
                    </div>
                </div>
            `;

            // Insere o HTML gerado no container
            productDetailContainer.innerHTML = productHtml;

        } catch (error) {
            console.error('Falha ao buscar detalhes do produto:', error);
            productDetailContainer.innerHTML = `<p class="text-red-500 text-center">${error.message}</p>`;
        }
    }

    // Chama a função principal
    fetchProductDetails();
});