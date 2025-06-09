document.addEventListener('DOMContentLoaded', () => {

    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartSummaryContainer = document.getElementById('cart-summary-container');

    // Função principal para renderizar toda a página do carrinho
    function renderCart() {
        const cart = getCart(); // Usando a função global de cart.js

        cartItemsContainer.innerHTML = '';
        cartSummaryContainer.innerHTML = '';

        if (cart.length === 0) {
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

        let totalPrice = 0;

        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'flex items-center justify-between border-b border-gray-200 py-4';
            itemElement.innerHTML = `
                <div class="flex items-center">
                    <img src="${item.image}" alt="${item.name}" class="w-20 h-20 object-cover rounded-md mr-4">
                    <div>
                        <h3 class="text-lg font-semibold text-gray-800">${item.name}</h3>
                        <p class="text-gray-600">Quantidade: ${item.quantity}</p>
                    </div>
                </div>
                <div class="text-right">
                    <p class="text-xl font-bold text-gray-800">R$ ${item.price.toFixed(2).replace('.', ',')}</p>
                    
                    <button class="text-red-500 hover:text-red-700 text-sm mt-1 remove-btn" data-product-id="${item.id}">
                        Remover
                    </button>
                </div>
            `;
            cartItemsContainer.appendChild(itemElement);
            totalPrice += item.price * item.quantity;
        });

        cartSummaryContainer.innerHTML = `
            <div class="border-t border-gray-200 mt-6 pt-6">
                <div class="flex justify-between items-center">
                    <span class="text-2xl font-semibold text-gray-700">Total</span>
                    <span class="text-3xl font-bold text-indigo-600">R$ ${totalPrice.toFixed(2).replace('.', ',')}</span>
                </div>
                <div class="text-right mt-6">
                    <button class="bg-green-600 text-white font-bold px-8 py-3 rounded-lg hover:bg-green-700 transition-colors w-full md:w-auto">
                        Finalizar Compra
                    </button>
                </div>
            </div>
        `;

        // 2. ADICIONAMOS A LÓGICA DE EVENTOS AQUI
        // Procura por todos os botões com a classe 'remove-btn'
        document.querySelectorAll('.remove-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                // Pega o ID do produto que guardamos no atributo 'data-product-id'
                const productId = parseInt(event.target.getAttribute('data-product-id'));
                
                // Chama a função global que está no cart.js
                removeFromCart(productId);
                
                // 3. A MÁGICA: Redesenha o carrinho para atualizar a tela
                renderCart();
            });
        });
    }

    // 4. A FUNÇÃO TEMPORÁRIA FOI REMOVIDA DAQUI

    // Renderiza o carrinho assim que a página é carregada
    renderCart();
});