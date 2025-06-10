# ArtisanHaven - E-commerce de Produtos Artesanais

<p align="center">
  <b>💼 Projeto Full Stack | 🐍 Flask + 🧩 Tailwind + ⚙️ JavaScript | 🌐 API RESTful</b><br>
  <i>Uma vitrine digital profissional para artesãos locais, com gestão de produtos, checkout completo e painel administrativo seguro.</i>
</p>

---

## 🚀 Deploy

Acesse a versão funcional do projeto através do link abaixo:

**[https://artisan-haven-ecommerce.vercel.app/](https://artisan-haven-ecommerce.vercel.app/)**

---

## 🎯 Sobre o Projeto

ArtisanHaven é uma plataforma completa de e-commerce full-stack, desenvolvida para ser a vitrine digital de um coletivo de artesãos locais. O projeto foi criado para resolver a necessidade de uma plataforma centralizada e profissional, superando a ineficiência das vendas por redes sociais e o controle manual de estoque e pedidos.

O sistema conta com uma interface moderna e intuitiva para os clientes e um poderoso painel administrativo para que os lojistas possam gerenciar seus produtos de forma simples e eficaz.

---

## 🔑 Acesso ao Painel Administrativo

Para explorar as funcionalidades de gerenciamento, utilize as seguintes credenciais na [página de login](https://artisan-haven-ecommerce.vercel.app/login.html):

- **Email:** `admin@artisan.com`
- **Senha:** `admin123`

---

## ✨ Destaques Técnicos

* **Arquitetura Full-Stack:** Clara separação entre o **Backend** (API RESTful em Python/Flask, deploy no Render) e o **Frontend** (HTML/CSS/JS puro, deploy na Vercel), comunicando-se via requisições HTTP.
* **API RESTful Completa:** Implementação de todos os endpoints **CRUD** (Create, Read, Update, Delete) para o gerenciamento de produtos.
* **Autenticação e Autorização:** Sistema de registro e login com armazenamento seguro de senhas (hash) e lógica de acesso diferenciado para usuários comuns e administradores.
* **Design Responsivo (Mobile-First):** Interface construída com **Tailwind CSS** pensando primeiro nos dispositivos móveis, garantindo uma experiência de usuário consistente em qualquer tamanho de tela.
* **Manipulação do DOM e Assincronicidade:** Uso intensivo de JavaScript moderno (`async/await` com `fetch`) para consumir a API, atualizar a interface dinamicamente e criar uma experiência de Single-Page Application (SPA) em várias seções.
* **Integração com API Externa:** Consulta à API **ViaCEP** para preenchimento automático de endereço, demonstrando a capacidade de integrar serviços de terceiros.
* **Gerenciamento de Estado no Cliente:** Utilização de `localStorage` para persistir o carrinho de compras, uma forma prática de gerenciamento de estado no lado do cliente.
* **DevOps e Boas Práticas:** Versionamento de código com **Git**, seguindo padrões de commits semânticos, e configuração de um fluxo de deploy contínuo via GitHub para Vercel e Render.

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
    - **Simulação de Pagamento:** Formulário para inserção de dados de pagamento para finalizar a compra. *(Nota: O processo de pagamento é uma simulação para fins de demonstração e não processa transações financeiras reais, garantindo a segurança e o foco na experiência do usuário.)*
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
| **JavaScript (ES6+)** | Interatividade, manipulação do DOM, chamadas a APIs e lógica do frontend. |
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
