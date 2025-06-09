# ArtisanHaven - E-commerce de Produtos Artesanais

<p align="center">
  <img src="https://via.placeholder.com/800x400.png?text=Demonstra%C3%A7%C3%A3o+do+ArtisanHaven" alt="Demonstração do projeto ArtisanHaven"/>
</p>

## 🎯 Sobre o Projeto

ArtisanHaven é uma plataforma completa de e-commerce full-stack, desenvolvida para ser a vitrine digital de um coletivo de artesãos locais. O projeto foi criado para resolver a necessidade de uma plataforma centralizada e profissional, superando a ineficiência das vendas por redes sociais e o controle manual de estoque e pedidos.

O sistema conta com uma interface moderna e intuitiva para os clientes e um poderoso painel administrativo para que os lojistas possam gerenciar seus produtos de forma simples e eficaz.

---

## ✨ Features

O projeto é dividido em duas grandes áreas: a loja virtual (storefront) para os clientes e a área de gerenciamento para o administrador.

#### 🛍️ Funcionalidades para Clientes
- **Vitrine de Produtos:** Galeria de produtos dinâmica, carregada via API.
- **Página de Detalhes:** Visualização dedicada para cada item do catálogo.
- **Carrinho de Compras Interativo:** Adição, remoção e **ajuste de quantidade** de itens, com cálculo de totais em tempo real e persistência de dados no navegador.
- **Sistema de Autenticação:** Fluxo completo de registro e login para clientes.
- **Fluxo de Checkout Simulado:**
    - **Stepper Visual:** Linha do tempo que guia o usuário pelas etapas (`Carrinho` -> `Endereço` -> `Pagamento`).
    - **Formulário de Endereço:** Com preenchimento automático de rua, bairro, cidade e estado a partir da consulta em uma API externa (ViaCEP).
    - **Simulação de Pagamento:** Formulário para inserção de dados de pagamento (fictício) para finalizar a compra.
- **Notificações Modernas:** Uso de notificações "Toast" para feedback de ações (sucesso, erro), melhorando a experiência do usuário.

#### ⚙️ Funcionalidades para Administrador
- **Dashboard Protegido:** Acesso restrito ao painel administrativo apenas para usuários autorizados.
- **Gerenciamento de Produtos (CRUD Completo):**
  - **Create:** Adicionar novos produtos através de um formulário interativo.
  - **Read:** Visualizar todos os produtos cadastrados em uma tabela de fácil leitura.
  - **Update:** Preenchimento automático do formulário para editar informações de produtos existentes.
  - **Delete:** Remover produtos do catálogo com uma etapa de confirmação.

---

## 🛠️ Tecnologias Utilizadas

A tabela abaixo lista as tecnologias e ferramentas utilizadas na construção do projeto:

| Tecnologia | Finalidade |
|------------|------------|
| **HTML5** | Estruturação e semântica das páginas web. |
| **Tailwind CSS** | Framework CSS para estilização rápida e moderna, com foco em utility-first. |
| **JavaScript (ES6+)** | Interatividade, manipulação do DOM e lógica do frontend. |
| **Python** | Linguagem principal do backend. |
| **Flask** | Micro-framework Python para a construção da API RESTful. |
| **Git & GitHub** | Controle de versão e hospedagem do código. |
| **Visual Studio Code** | Editor de código principal. |

---

## 📝 Licença

Este projeto está sob a licença MIT.

---

<p align="center">
  Feito com ❤️ por Harumi.
</p>
