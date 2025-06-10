// frontend/src/js/admin.js

document.addEventListener('DOMContentLoaded', () => {
    // --- Proteção da Página ---
    const userString = localStorage.getItem('user');
    if (!userString) {
        window.location.href = './login.html';
        return;
    }

    const user = JSON.parse(userString);
    if (user.email !== 'admin@artisan.com') {
        Toastify({
            text: "Acesso negado. Apenas administradores.",
            duration: 3000,
            gravity: "top",
            position: "center",
            style: { background: "#F44336" }
        }).showToast();
        setTimeout(() => { window.location.href = './index.html'; }, 3000);
        return;
    }

    // --- Referências aos Elementos do DOM ---
    const productForm = document.getElementById('product-form');
    const formTitle = document.getElementById('form-title');
    const productListBody = document.getElementById('product-list-body');
    const hiddenIdInput = document.getElementById('product-id');
    const clearBtn = document.getElementById('clear-btn');

    const API_URL = 'http://127.0.0.1:5000/api/products';

    // --- Funções ---

    // Função para buscar e exibir os produtos na tabela
    const fetchAndDisplayProducts = async () => {
        try {
            const response = await fetch(API_URL);
            const products = await response.json();

            productListBody.innerHTML = ''; // Limpa a tabela antes de preencher
            products.forEach(product => {
                const row = document.createElement('tr');
                row.className = 'border-b';
                
                // O CÓDIGO ATUALIZADO ESTÁ AQUI
                row.innerHTML = `
                    <td class="py-2 px-4">${product.id}</td>
                    <td class="py-2 px-4">${product.name}</td>
                    <td class="py-2 px-4">R$ ${product.price.toFixed(2)}</td>
                    <td class="py-2 px-4">
                        <div class="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2 sm:justify-center">
                            <button class="bg-yellow-500 text-white px-2 py-1 rounded-md text-sm hover:bg-yellow-600 edit-btn" data-id="${product.id}">Editar</button>
                            <button class="bg-red-600 text-white px-2 py-1 rounded-md text-sm hover:bg-red-700 delete-btn" data-id="${product.id}">Excluir</button>
                        </div>
                    </td>
                `;
                productListBody.appendChild(row);
            });
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
        }
    };

    // Função para limpar o formulário e voltar ao modo de adição
    const clearForm = () => {
        productForm.reset();
        hiddenIdInput.value = '';
        formTitle.textContent = 'Adicionar Novo Produto';
    };

    // --- Event Listeners ---
    productForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const id = hiddenIdInput.value;
        const productData = {
            name: document.getElementById('name').value,
            price: document.getElementById('price').value,
            description: document.getElementById('description').value,
            image_url: document.getElementById('image_url').value,
        };
        const method = id ? 'PUT' : 'POST';
        const url = id ? `${API_URL}/${id}` : API_URL;

        try {
            const response = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(productData),
            });

            if (response.ok) {
                Toastify({
                    text: `Produto ${id ? 'atualizado' : 'criado'} com sucesso!`,
                    duration: 3000,
                    style: { background: "#4CAF50" }
                }).showToast();
                clearForm();
                fetchAndDisplayProducts();
            } else {
                Toastify({
                    text: "Erro ao salvar o produto.",
                    duration: 3000,
                    style: { background: "#F44336" }
                }).showToast();
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
        }
    });

    // Listener para os botões da tabela (Editar e Excluir)
    productListBody.addEventListener('click', async (event) => {
        const target = event.target;
        const id = target.getAttribute('data-id');

        if (target.classList.contains('delete-btn')) {
            if (confirm(`Tem certeza que deseja excluir o produto com ID ${id}?`)) {
                try {
                    const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
                    if (response.ok) {
                        Toastify({
                            text: "Produto excluído com sucesso!",
                            duration: 3000,
                            style: { background: "#4CAF50" }
                        }).showToast();
                        fetchAndDisplayProducts();
                    } else {
                        Toastify({
                            text: "Erro ao excluir o produto.",
                            duration: 3000,
                            style: { background: "#F44336" }
                        }).showToast();
                    }
                } catch (error) {
                    console.error('Erro na requisição:', error);
                }
            }
        }

        if (target.classList.contains('edit-btn')) {
            try {
                const response = await fetch(`${API_URL}/${id}`);
                const product = await response.json();
                
                document.getElementById('name').value = product.name;
                document.getElementById('price').value = product.price;
                document.getElementById('description').value = product.description;
                document.getElementById('image_url').value = product.image_url;
                hiddenIdInput.value = product.id;
                formTitle.textContent = `Editando Produto: ${product.name}`;
                window.scrollTo(0, 0);
            } catch (error) {
                console.error('Erro ao buscar dados do produto:', error);
            }
        }
    });
    
    // Listener para o botão de limpar
    clearBtn.addEventListener('click', clearForm);

    // --- Inicialização ---
    fetchAndDisplayProducts();
});