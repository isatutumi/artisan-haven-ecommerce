// frontend/src/js/carrinho.js

document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartSummaryContainer = document.getElementById('cart-summary-container');
    const API_URL = 'http://127.0.0.1:5000/api/products';

    async function renderCart() {
        const localCart = getCart();
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
            // Atualiza o stepper para a primeira etapa quando o carrinho está vazio
            const stepperContainer = document.getElementById('stepper');
            if(stepperContainer) {
                stepperContainer.innerHTML = ''; // Limpa o stepper se não houver itens
            }
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
                    // LAYOUT RESPONSIVO: flex-col no mobile, sm:flex-row em telas maiores
                    itemElement.className = 'flex flex-col sm:flex-row items-center justify-between border-b border-gray-200 py-4';
                    
                    itemElement.innerHTML = `
                        <div class="flex items-center space-x-4 w-full sm:w-auto">
                            <img src="${productDetails.image_url}" alt="${productDetails.name}" class="w-20 h-20 object-cover rounded-md">
                            <div>
                                <h3 class="text-lg font-semibold text-gray-800">${productDetails.name}</h3>
                                <p class="text-gray-600 text-sm">Preço Unitário: R$ ${productDetails.price.toFixed(2).replace('.', ',')}</p>
                                <button class="text-red-500 hover:text-red-700 text-sm mt-1 remove-from-cart-btn" data-product-id="${cartItem.id}">
                                    Remover
                                </button>
                            </div>
                        </div>
                        <div class="flex items-center justify-between w-full sm:w-auto mt-4 sm:mt-0 space-x-4">
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
            
            // Renderiza o stepper apenas se houver itens no carrinho
            const stepperContainer = document.getElementById('stepper');
            if (stepperContainer) {
                // Copiamos a lógica do stepper do checkout.js para cá
                const stepperHTML = `
                    <ol class="flex items-center w-full">
                        <li class="flex w-full items-center text-indigo-600 after:content-[''] after:w-full after:h-1 after:border-b after:border-indigo-100 after:border-4 after:inline-block">
                            <span class="flex items-center justify-center w-10 h-10 bg-indigo-100 rounded-full shrink-0"><svg class="w-5 h-5 text-indigo-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20"><path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm-1 9.414V4a1 1 0 1 1 2 0v5.414l2.293 2.293a1 1 0 0 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10Z"/></svg></span>
                        </li>
                        <li class="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-100 after:border-4 after:inline-block">
                            <span class="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full shrink-0"><svg class="w-5 h-5 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20"><path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4Z"/><path d="M0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/></svg></span>
                        </li>
                        <li class="flex items-center">
                            <span class="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full shrink-0"><svg class="w-5 h-5 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20"><path d="M11.074 4 8.442.408A.95.95 0 0 0 7.014.254L2.926 4h8.148ZM9 13v-1a4 4 0 0 1 4-4h6V6a1 1 0 0 0-1-1H1a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h17a1 1 0 0 0 1-1v-2h-6a4 4 0 0 1-4-4Z"/><path d="M19 10h-6a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h6a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1Zm-4.5 3.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"/></svg></span>
                        </li>
                    </ol>
                `;
                stepperContainer.innerHTML = stepperHTML;
            }

        } catch (error) {
            console.error("Erro ao sincronizar carrinho:", error);
            cartItemsContainer.innerHTML = `<p class="text-red-500 text-center">Não foi possível carregar os itens do carrinho. Tente novamente.</p>`;
        }
    }

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

    renderCart();
});