// frontend/src/js/cart.js

/**
 * Busca o carrinho do localStorage.
 */
function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

/**
 * Salva o carrinho no localStorage.
 */
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

/**
 * ATUALIZAÇÃO 1: O ícone do carrinho agora mostra o NÚMERO TOTAL de itens.
 * Em vez de contar quantos produtos diferentes existem, ele soma todas as quantidades.
 */
function updateCartIcon() {
    const cart = getCart();
    const cartCountElement = document.getElementById('cart-count');

    // Usa reduce para somar a quantidade de cada item no carrinho
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    if (cartCountElement) {
        cartCountElement.textContent = totalItems;
    }
}

/**
 * ATUALIZAÇÃO 2: A função addToCart agora é mais inteligente.
 * Se o produto já existe, ela incrementa a quantidade em vez de apenas alertar.
 */
function addToCart(productId, productName, productPrice, productImage) {
    const cart = getCart();
    const existingProduct = cart.find(item => item.id === productId);

    if (existingProduct) {
        // Se o produto já existe no carrinho, apenas incrementa sua quantidade.
        existingProduct.quantity++;
        // ANTES: alert('Quantidade do produto atualizada no carrinho!');
        Toastify({
            text: "Quantidade atualizada no carrinho!",
            duration: 3000,
            gravity: "bottom",
            position: "right",
            style: { background: "#4CAF50" } // Verde sucesso
        }).showToast();
    } else {
        // Se for um novo produto, adiciona ele ao array com quantidade inicial 1.
        cart.push({
            id: productId,
            name: productName,
            price: productPrice,
            image: productImage,
            quantity: 1
        });
        // ANTES: alert('Produto adicionado ao carrinho!');
        Toastify({
            text: "Produto adicionado ao carrinho!",
            duration: 3000,
            gravity: "bottom",
            position: "right",
            style: { background: "#4CAF50" } // Verde sucesso
        }).showToast();
    }

    saveCart(cart);
    updateCartIcon();
}

/**
 * NOVA FUNÇÃO: Altera a quantidade de um item específico no carrinho.
 * Esta função será usada pelos botões de "+" e "-".
 * @param {number} productId O ID do produto a ser atualizado.
 * @param {number} newQuantity A nova quantidade do produto.
 */
function updateItemQuantity(productId, newQuantity) {
    let cart = getCart();

    // Encontra o item que queremos atualizar.
    const itemToUpdate = cart.find(item => item.id === productId);

    if (itemToUpdate) {
        if (newQuantity > 0) {
            // Se a nova quantidade é positiva, atualiza.
            itemToUpdate.quantity = newQuantity;
        } else {
            // Se a quantidade for 0 ou menor, remove o item do carrinho.
            cart = cart.filter(item => item.id !== productId);
        }
    }

    saveCart(cart);
    updateCartIcon();
}

/**
 * Remove um produto do carrinho de compras pelo seu ID (função existente, sem alterações).
 */
function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart);
    updateCartIcon();
}


// Este evento garante que o ícone do carrinho seja atualizado assim que a página for carregada.
document.addEventListener('DOMContentLoaded', () => {
    updateCartIcon();
});