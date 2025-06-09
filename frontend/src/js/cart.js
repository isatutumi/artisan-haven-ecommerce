// frontend/src/js/cart.js

/**
 * Busca o carrinho do localStorage.
 * @returns {Array} O carrinho de compras, ou um array vazio se não houver um.
 */
function getCart() {
    const cartString = localStorage.getItem('cart') || '[]';
    return JSON.parse(cartString);
}

/**
 * Salva o carrinho no localStorage.
 * @param {Array} cart O array do carrinho de compras a ser salvo.
 */
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

/**
 * Atualiza o número exibido no ícone do carrinho no cabeçalho.
 */
function updateCartIcon() {
    const cart = getCart();
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = cart.length;
    }
}

/**
 * Adiciona um produto ao carrinho de compras.
 * @param {number} productId O ID do produto.
 * @param {string} productName O nome do produto.
 * @param {number} productPrice O preço do produto.
 * @param {string} productImage A URL da imagem do produto.
 */
function addToCart(productId, productName, productPrice, productImage) {
    const cart = getCart();
    const existingProduct = cart.find(item => item.id === productId);

    if (existingProduct) {
        alert('Este produto já está no seu carrinho!');
    } else {
        cart.push({
            id: productId,
            name: productName,
            price: productPrice,
            image: productImage,
            quantity: 1
        });
        alert('Produto adicionado ao carrinho!');
    }

    saveCart(cart);
    updateCartIcon();
}

// ======================= ADICIONE ESTA NOVA FUNÇÃO =======================
/**
 * Remove um produto do carrinho de compras pelo seu ID.
 * @param {number} productId O ID do produto a ser removido.
 */
function removeFromCart(productId) {
    let cart = getCart();
    
    // O método filter() cria um NOVO array que inclui todos os itens,
    // exceto aquele cujo 'id' corresponde ao 'productId' que queremos remover.
    cart = cart.filter(item => item.id !== productId);

    // Salva o novo carrinho (agora sem o item removido) no localStorage
    saveCart(cart);
    
    // Atualiza o ícone do carrinho no cabeçalho
    updateCartIcon();
}
// ======================================================================

// Este evento garante que o ícone do carrinho seja atualizado assim que a página for carregada.
document.addEventListener('DOMContentLoaded', () => {
    updateCartIcon();
});