// frontend/src/js/carrinho.js

document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartSummaryContainer = document.getElementById('cart-summary-container');
    const API_URL = 'http://127.0.0.1:5000/api/products';

    async function renderCart() {
        const localCart = getCart(); // Pega o carrinho salvo localmente (com id e quantity)
        cartItemsContainer.innerHTML = '';
        cartSummaryContainer.innerHTML = '';

        if (localCart.length === 0) {
            cartItemsContainer.innerHTML = `
                <p class="text-gray-500 text-center py-4">Seu carrinho está vazio.</p>
                <div class="text-center mt-4">
                    <a href="./index.html" class="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                        Voltar para a loja
                    </a>
                </div>
            `;
            return;
        }

        try {
            const response = await fetch(API_URL);
            const serverProducts = await response.json();

            let totalPrice = 0;

            localCart.forEach(cartItem => {
                const productDetails = serverProducts.find(p => p.id === cartItem.id);

                if (productDetails) {
                    const itemTotalPrice = productDetails.price * cartItem.quantity;
                    totalPrice += itemTotalPrice;

                    const itemElement = document.createElement('div');
                    itemElement.className = 'flex items-center justify-between border-b border-gray-200 py-4';
                    
                    itemElement.innerHTML = `
                        <div class="flex items-center space-x-4">
                            <img src="${productDetails.image_url}" alt="${productDetails.name}" class="w-20 h-20 object-cover rounded-md">
                            <div>
                                <h3 class="text-lg font-semibold text-gray-800">${productDetails.name}</h3>
                                <p class="text-gray-600">Preço Unitário: R$ ${productDetails.price.toFixed(2).replace('.', ',')}</p>
                                <button class="text-red-500 hover:text-red-700 text-sm mt-1 remove-from-cart-btn" data-product-id="${cartItem.id}">
                                    Remover
                                </button>
                            </div>
                        </div>
                        <div class="flex items-center space-x-4">
                            <div class="flex items-center border rounded-md">
                                <button class="px-3 py-1 text-lg font-bold text-gray-700 hover:bg-gray-200 quantity-minus-btn" data-product-id="${cartItem.id}">-</button>
                                <span class="px-4 py-1 text-lg">${cartItem.quantity}</span>
                                <button class="px-3 py-1 text-lg font-bold text-gray-700 hover:bg-gray-200 quantity-plus-btn" data-product-id="${cartItem.id}">+</button>
                            </div>
                            <p class="text-xl font-bold text-gray-800 w-28 text-right">R$ ${itemTotalPrice.toFixed(2).replace('.', ',')}</p>
                        </div>
                    `;
                    cartItemsContainer.appendChild(itemElement);
                }
            });

            // Renderiza o resumo com o total atualizado
            cartSummaryContainer.innerHTML = `
                <div class="border-t border-gray-200 mt-6 pt-6">
                    <div class="flex justify-between items-center">
                        <span class="text-2xl font-semibold text-gray-700">Total</span>
                        <span class="text-3xl font-bold text-indigo-600">R$ ${totalPrice.toFixed(2).replace('.', ',')}</span>
                    </div>
                    <div class="text-right mt-6">
                        <a href="./checkout.html" class="inline-block bg-green-600 text-white font-bold px-8 py-3 rounded-lg hover:bg-green-700 transition-colors w-full text-center md:w-auto">
                            Finalizar Compra
                        </a>
                    </div>
                </div>
            `;

        } catch (error) {
            console.error("Erro ao sincronizar carrinho:", error);
            cartItemsContainer.innerHTML = `<p class="text-red-500 text-center">Não foi possível carregar os itens do carrinho. Tente novamente.</p>`;
        }
    }

    // A lógica de eventos (clicks nos botões) permanece a mesma.
    cartItemsContainer.addEventListener('click', (event) => {
        const target = event.target;
        const productId = parseInt(target.getAttribute('data-product-id'));

        if (!productId) return;

        if (target.classList.contains('quantity-plus-btn')) {
            const item = getCart().find(i => i.id === productId);
            if (item) {
                updateItemQuantity(productId, item.quantity + 1);
                renderCart();
            }
        }

        if (target.classList.contains('quantity-minus-btn')) {
            const item = getCart().find(i => i.id === productId);
            if (item) {
                updateItemQuantity(productId, item.quantity - 1);
                renderCart();
            }
        }
        
        if (target.classList.contains('remove-from-cart-btn')) {
            removeFromCart(productId);
            renderCart();
        }
    });

    // Renderiza o carrinho assim que a página é carregada
    renderCart();
});