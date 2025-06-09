// frontend/src/js/checkout.js

document.addEventListener('DOMContentLoaded', () => {
    // --- Referências aos Elementos ---
    const stepperContainer = document.getElementById('stepper');
    const addressSection = document.getElementById('address-section');
    const paymentSection = document.getElementById('payment-section');

    const addressForm = document.getElementById('address-form');
    const paymentForm = document.getElementById('payment-form');
    const backToAddressBtn = document.getElementById('back-to-address-btn');

    // --- Lógica do Stepper ---
    const renderStepper = (currentStep) => {
        const steps = [
            { name: 'Carrinho', icon: '<path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"></path>' },
            { name: 'Endereço', icon: '<path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4Z"/><path d="M0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>' },
            { name: 'Pagamento', icon: '<path d="M11.074 4 8.442.408A.95.95 0 0 0 7.014.254L2.926 4h8.148ZM9 13v-1a4 4 0 0 1 4-4h6V6a1 1 0 0 0-1-1H1a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h17a1 1 0 0 0 1-1v-2h-6a4 4 0 0 1-4-4Z"/><path d="M19 10h-6a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h6a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1Zm-4.5 3.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"/>' }
        ];

        let stepperHTML = '<ol class="flex items-center w-full">';
        steps.forEach((step, index) => {
            const stepNumber = index + 1;
            let liClass = "flex w-full items-center";
            let spanClass = "flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full shrink-0";
            let svgClass = "w-5 h-5 text-gray-500";

            if (stepNumber < currentStep) { // Etapa concluída
                liClass += " text-green-600 after:content-[''] after:w-full after:h-1 after:border-b after:border-green-100 after:border-4 after:inline-block";
                spanClass = "flex items-center justify-center w-10 h-10 bg-green-100 rounded-full shrink-0";
                svgClass = "w-5 h-5 text-green-600";
            } else if (stepNumber === currentStep) { // Etapa atual
                liClass += " text-indigo-600 after:content-[''] after:w-full after:h-1 after:border-b after:border-indigo-100 after:border-4 after:inline-block";
                spanClass = "flex items-center justify-center w-10 h-10 bg-indigo-100 rounded-full shrink-0";
                svgClass = "w-5 h-5 text-indigo-600";
            }

            if(stepNumber === steps.length) { // Última etapa não tem a linha conectora
                liClass = "flex items-center";
            }

            stepperHTML += `
                <li class="${liClass}">
                    <span class="${spanClass}">
                        <svg class="${svgClass}" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">${step.icon}</svg>
                    </span>
                </li>
            `;
        });
        stepperHTML += '</ol>';
        stepperContainer.innerHTML = stepperHTML;
    };


    // --- Lógica do Formulário de Endereço ---
    const cepInput = document.getElementById('cep');
    cepInput.addEventListener('blur', async () => {
        const cep = cepInput.value.replace(/\D/g, '');
        if (cep.length !== 8) return;
        
        const url = `https://viacep.com.br/ws/${cep}/json/`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data.erro) {
                Toastify({ text: "CEP não encontrado.", style: { background: "#F44336" } }).showToast();
                return;
            }
            document.getElementById('rua').value = data.logradouro;
            document.getElementById('bairro').value = data.bairro;
            document.getElementById('cidade').value = data.localidade;
            document.getElementById('uf').value = data.uf;
            document.getElementById('numero').focus();
        } catch (error) {
            console.error("Erro ao buscar CEP:", error);
            Toastify({ text: "Não foi possível buscar o CEP.", style: { background: "#F44336" } }).showToast();
        }
    });

    addressForm.addEventListener('submit', (event) => {
        event.preventDefault();
        // Aqui poderíamos salvar o endereço no localStorage, se quiséssemos
        addressSection.classList.add('hidden');
        paymentSection.classList.remove('hidden');
        renderStepper(3); // Atualiza o stepper para a etapa de pagamento
    });

    // --- Lógica do Formulário de Pagamento ---
    backToAddressBtn.addEventListener('click', () => {
        paymentSection.classList.add('hidden');
        addressSection.classList.remove('hidden');
        renderStepper(2); // Volta o stepper para a etapa de endereço
    });

    paymentForm.addEventListener('submit', (event) => {
        event.preventDefault();
        // Simulação de processamento de pagamento
        Toastify({
            text: "Processando pagamento...",
            duration: 2000,
            style: { background: "#3B82F6" } // Azul
        }).showToast();

        // Simula a conclusão do pedido após um delay
        setTimeout(() => {
            // Limpa o carrinho
            localStorage.removeItem('cart');
            updateCartIcon(); // Atualiza o ícone no cabeçalho

            // Redireciona para uma página de sucesso
            window.location.href = './obrigado.html';
        }, 2000);
    });

    // --- Inicialização ---
    renderStepper(2); // Inicia o checkout na etapa de endereço
});