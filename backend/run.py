# backend/run.py

from flask import Flask, jsonify, request
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
# Define a lista de URLs que podem fazer requisições para sua API
origins = [
    "http://127.0.0.1:5500",  # Permite que você continue testando localmente
    "https://artisan-haven-ecommerce.vercel.app"  # A URL do seu site na Vercel
]

# Aplica a configuração do CORS, permitindo apenas as origens da lista
CORS(app, resources={r"/api/*": {"origins": origins}})

# --- DADOS MOCADOS (Agora como variáveis globais) ---

products = [
    # --- Produtos existentes ---
    {
        "id": 1,
        "name": "Vaso Essência Esculpida",
        "price": 110.00,
        "description": "Cada curva, um convite à exclusividade. Uma obra de arte singular para seu espaço.",
        "image_url": "https://images.unsplash.com/photo-1736124708833-e35794c2faac?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        "id": 2,
        "name": "Pratos Legado Dourado",
        "price": 180.00,
        "description": "A beleza da imperfeição elevada a um novo patamar de requinte. Peças de história.",
        "image_url": "https://images.unsplash.com/photo-1701383700322-007c0fe0a154?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        "id": 3,
        "name": "Copo Toque Ancestral",
        "price": 95.00,
        "description": "Sinta a conexão com a terra em cada toque. Exclusividade em sua mão.",
        "image_url": "https://images.unsplash.com/photo-1666445759502-85124c28524e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    # --- 7 NOVOS PRODUTOS ADICIONADOS ---
    {
        "id": 4,
        "name": "Vaso Harmonia Intrínseca",
        "price": 130.00,
        "description": " Uma declaração de design. A peça que redefine o minimalismo.",
        "image_url": "https://images.unsplash.com/photo-1643569556871-91ec60671ed7?q=80&w=1923&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        "id": 5,
        "name": "Copo Fragmentos Únicos",
        "price": 320.00,
        "description": "Texturas que contam histórias. Um conjunto de exclusividade para momentos especiais.",
        "image_url": "https://images.unsplash.com/photo-1666713716266-dcc759bdcc3a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        "id": 6,
        "name": "Copo Essência Dual",
        "price": 60.00,
        "description": "Onde duas almas se encontram. Design e sofisticação em uma única peça.",
        "image_url": "https://images.unsplash.com/photo-1666866875759-84154ec24c85?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjU3fHxjZXIlQzMlQTJtaWNhfGVufDB8fDB8fHwy"
    },
    {
        "id": 7,
        "name": "Coleção Formas Primitivas",
        "price": 380.00,
        "description": "Um conjunto exclusivo de texturas e contornos que celebram a arte da criação. Cada peça, um toque de autenticidade para seu espaço.",
        "image_url": "https://images.unsplash.com/photo-1701267658898-a3f2c8f11e72?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzU1fHxjZXJhbWljfGVufDB8fDB8fHwy"
    },
    {
        "id": 8,
        "name": "Vaso Corações Secretos",
        "price": 89.90,
        "description": "Uma escultura que esconde mistérios e revela a paixão do artesão. Design singular para olhares que valorizam o exclusivo.",
        "image_url": "https://images.unsplash.com/photo-1694010336210-1f0259298530?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjA2fHxjZXJhbWljfGVufDB8fDB8fHwy"
    },
    {
        "id": 9,
        "name": "Copo Maré de Singularidade",
        "price": 135.00,
        "description": "O frescor do oceano em um design inconfundível. Cada salpico conta uma história de exclusividade.",
        "image_url": "https://images.unsplash.com/photo-1666949655621-c9ba05edc6ca?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjYzfHxjZXJhbWljfGVufDB8fDB8fHwy"
    }
]
# Simulando o auto-incremento de ID de um banco de dados
next_product_id = 10


users = [
    {
        "id": 1,
        "name": "Admin",
        "email": "admin@artisan.com",
        "password_hash": generate_password_hash("admin123")
    }
]
next_user_id = 2


# --- ROTAS EXISTENTES (Sem alterações) ---

@app.route('/api/products', methods=['GET'])
def get_products():
    return jsonify(products)

@app.route('/api/products/<int:product_id>', methods=['GET'])
def get_product(product_id):
    product = next((p for p in products if p['id'] == product_id), None)
    if product:
        return jsonify(product)
    return jsonify({"error": "Produto não encontrado"}), 404

# ... (Rotas de registro e login ficam aqui, sem alterações)
@app.route('/api/register', methods=['POST'])
def register():
    # ... código existente
    global next_user_id
    data = request.get_json()
    if not data or not data.get('name') or not data.get('email') or not data.get('password'):
        return jsonify({"error": "Dados incompletos"}), 400
    if any(u['email'] == data['email'] for u in users):
        return jsonify({"error": "Este email já está cadastrado"}), 409
    new_user = {
        "id": next_user_id,
        "name": data['name'],
        "email": data['email'],
        "password_hash": generate_password_hash(data['password'])
    }
    users.append(new_user)
    next_user_id += 1
    return jsonify({"message": "Usuário registrado com sucesso!", "user_id": new_user['id']}), 201

@app.route('/api/login', methods=['POST'])
def login():
    # ... código existente
    data = request.get_json()
    if not data or not data.get('email') or not data.get('password'):
        return jsonify({"error": "Dados incompletos"}), 400
    user = next((u for u in users if u['email'] == data['email']), None)
    if user and check_password_hash(user['password_hash'], data['password']):
        return jsonify({
            "message": "Login bem-sucedido!",
            "user": {"id": user['id'], "name": user['name'], "email": user['email']}
        }), 200
    else:
        return jsonify({"error": "Email ou senha inválidos"}), 401


# --- NOVAS ROTAS DA API DE CRUD DE PRODUTOS ---

# Rota para CRIAR um novo produto (CREATE)
@app.route('/api/products', methods=['POST'])
def create_product():
    global next_product_id
    data = request.get_json()
    
    # Validação simples
    if not data or not all(k in data for k in ('name', 'price', 'description')):
        return jsonify({'error': 'Dados incompletos'}), 400

    new_product = {
        'id': next_product_id,
        'name': data['name'],
        'price': float(data['price']),
        'description': data['description'],
        'image_url': data.get('image_url', f"https://via.placeholder.com/400x400.png?text={data['name'].replace(' ', '+')}")
    }
    products.append(new_product)
    next_product_id += 1
    return jsonify(new_product), 201 # 201 Created

# Rota para ATUALIZAR um produto existente (UPDATE)
@app.route('/api/products/<int:product_id>', methods=['PUT'])
def update_product(product_id):
    product = next((p for p in products if p['id'] == product_id), None)
    if not product:
        return jsonify({'error': 'Produto não encontrado'}), 404
    
    data = request.get_json()
    
    # Atualiza os campos do produto com os dados recebidos
    product['name'] = data.get('name', product['name'])
    product['price'] = float(data.get('price', product['price']))
    product['description'] = data.get('description', product['description'])
    product['image_url'] = data.get('image_url', product['image_url'])
    
    return jsonify(product)

# Rota para DELETAR um produto (DELETE)
@app.route('/api/products/<int:product_id>', methods=['DELETE'])
def delete_product(product_id):
    global products
    product = next((p for p in products if p['id'] == product_id), None)
    if not product:
        return jsonify({'error': 'Produto não encontrado'}), 404
    
    # Recria a lista de produtos, excluindo o produto com o ID correspondente
    products = [p for p in products if p['id'] != product_id]
    
    return jsonify({'message': 'Produto deletado com sucesso'}), 200


# --- INICIALIZAÇÃO DO SERVIDOR ---
if __name__ == '__main__':
    app.run(debug=True)